import { ipcMain } from "./ipcMain";
import { windows } from "ym-electron.js";
import { readJson, writeJson } from "../api/fs";
import { autoUpdater } from "./updater";
import { handlePlayUrl } from "../api/tools";

//最小化
ipcMain.on("minimize", () => {
  const win = windows.get("manage")!;
  win.minimize();
});

//最大化还原
ipcMain.on("maximize", () => {
  const win = windows.get("manage")!;
  win.isMaximized() ? win.restore() : win.maximize();
});

//关闭
ipcMain.on("close", () => {
  const win = windows.get("manage")!;
  win.close();
});

//读取配置
ipcMain.handle("readConfig", async (_, name) => {
  return await readJson(name);
});

//写入配置
ipcMain.handle("writeConfig", async (_, name, data) => {
  await writeJson(name, data);
});

//获取图片
ipcMain.handle("getImg", async (_, url) => {
  const response = await fetch(url);

  const data = await response.arrayBuffer();

  return `data:image/jpeg;base64,${Buffer.from(data).toString("base64")}`;
});

//获取热门电影
ipcMain.handle("getRecommend", async (_, option) => {
  const { type, start = 0 } = option;

  const url = `https://m.douban.com/rexxar/api/v2/${type}/recommend?refresh=0&start=${start}&count=20&uncollect=false&sort=U&playable=true`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
  });

  const data = await response.json();

  return data.items.map((item: any) => {
    return {
      name: item.title,
      pic: item.pic.normal,
      id: item.id,
    };
  });
});

//根据id获取播放地址
ipcMain.handle("getUrl", async (_, name) => {
  const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${name}`;

  const response = await fetch(url);

  const json = await response.json();

  const data: {
    vod_play_url: string;
    vod_id: string;
    vod_name: string;
  }[] = json.posts;

  const res = data.find(item => item.vod_name == name);

  if (!res) {
    return [];
  }

  return handlePlayUrl(res.vod_play_url);
});

//搜索
ipcMain.handle("search", async (_, keyword) => {
  const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${keyword}&count=50`;

  const response = await fetch(url);

  //获取返回的html
  const json = await response.json();

  const data = json.posts.filter(
    (item: any) => item.type_name != "电影解说" && item.type_name != "预告片"
  );

  return data.map(item => {
    return {
      name: item.vod_name,
      id: item.vod_id,
      url: handlePlayUrl(item.vod_play_url),
      pic: item.vod_pic,
    };
  });
});

//检查更新
ipcMain.handle("checkForUpdates", async () => {
  const res = await autoUpdater.checkForUpdates();

  return res?.updateInfo.version || "";
});
