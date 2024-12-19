import { ipcMain } from "./ipcMain";
import { windows } from "ym-electron.js";
import { readJson, writeJson } from "../api/fs";
import { shell } from "electron";
// import { autoUpdater } from "electron-updater";

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
ipcMain.handle("readConfig", async (_, name: string) => {
  return await readJson(name);
});

//写入配置
ipcMain.handle("writeConfig", async (_, name: string, data: any) => {
  await writeJson(name, data);
  return true;
});

//打开网页
ipcMain.on("openURL", (_, url: string) => {
  shell.openExternal(url);
});

//获取图片
ipcMain.handle("getImg", async (_, url: string) => {
  const response = await fetch(url);

  const data = await response.arrayBuffer();

  return `data:image/jpeg;base64,${Buffer.from(data).toString("base64")}`;
});

//获取热门电影
type getMovieOption = {
  type: "tv" | "movie";
  start: number;
};

ipcMain.handle("getMovie", async (_, option: getMovieOption) => {
  const { type, start = 0 } = option;

  const url = `https://m.douban.com/rexxar/api/v2/${type}/recommend?refresh=0&start=${start}&count=20&uncollect=false&sort=U&playable=true`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
  });

  const data = await response.json();

  return data.items.map((item: any) => {
    return {
      name: item.title,
      year: item.year,
      img: item.pic.normal,
      id: item.id,
    };
  });
});

//根据id获取播放地址
type getUrlOption = {
  id: string;
  cookie: string;
};

ipcMain.handle("getUrl", async (_, option: getUrlOption) => {
  const { id, cookie } = option;

  const url = `https://movie.douban.com/subject/${id}/`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
    headers: {
      cookie,
    },
  });

  //获取返回的html
  const html = await response.text();

  const reg = /"https:\/\/www.douban.com\/link2\/\?url\=(.*?)"/g;

  const urls = [...html.matchAll(reg)]
    .map(item => decodeURIComponent(item[1]).split("?")[0])
    .filter(url => !url.includes("migu") && !url.includes("bilibili"));

  return [...new Set(urls)];
});

//搜索
type searchOption = {
  keyword: string;
  cookie: string;
};

ipcMain.handle("search", async (_, option: searchOption) => {
  const { keyword, cookie } = option;

  const url = `https://search.douban.com/movie/subject_search?search_text=${keyword}&start=0`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
    headers: {
      cookie,
    },
  });

  const html = await response.text();

  type Result = {
    title: string;
    cover_url: string;
    id: string;
    labels: object[];
  };

  const data: Result[] = JSON.parse(
    html.match(/window.__DATA__ = (.*?);/)![1]
  ).items;

  return data
    .filter(item => item.labels && item.labels.length != 0)
    .map(item => {
      const info = item.title.split(" ");
      const year = info.at(-1)!.replace(/[()]/g, "");

      return {
        name: info[0],
        year,
        img: item.cover_url,
        id: item.id,
      };
    });
});

//检查更新
// ipcMain.handle("checkForUpdates", async _ => {
//   const res = await autoUpdater.checkForUpdates();

//   const newVersion = res?.updateInfo.version;

//   if (newVersion !== autoUpdater.currentVersion.version) {
//     return newVersion;
//   }

//   return void 0;
// });
