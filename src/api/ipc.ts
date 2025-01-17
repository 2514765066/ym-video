import { ipcMain } from "./ipcMain";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { resources } from "./path";
import { autoUpdater } from "./updater";
import { handlePlayUrl } from "./tools";

//读取配置
ipcMain.handle("readConfig", async () => {
  const path = join(resources, `db.json`);

  if (!existsSync(path)) {
    return null;
  }

  const res = await readFile(path);

  return JSON.parse(res.toString());
});

//写入配置
ipcMain.handle("writeConfig", async (_, data) => {
  if (!existsSync(resources)) {
    await mkdir(resources);
  }

  const path = join(resources, `db.json`);

  await writeFile(path, data);
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

  const response = await fetch(url, {
    headers: {
      "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0`,
    },
  });

  //获取返回的html
  const json = await response.json();

  const data = json.posts.filter(
    (item: any) => item.type_name != "电影解说" && item.type_name != "预告片"
  );

  return data.map(item => {
    return {
      name: item.vod_name,
      url: handlePlayUrl(item.vod_play_url),
      pic: item.vod_pic,
    };
  });
});

//检查是否有更新
ipcMain.handle("checkForUpdates", async () => {
  const res = await autoUpdater.checkForUpdatesAndNotify();

  return res?.updateInfo.version;
});
