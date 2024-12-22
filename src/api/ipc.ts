import { ipcMain } from "./ipcMain";
import { windows } from "ym-electron.js";
import { readJson, writeJson } from "../api/fs";
import { autoUpdater } from "./updater";

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

  //检测是否被封禁
  if (html.includes("有异常请求从你的 IP 发出")) {
    return {
      status: 403,
      data: [],
    };
  }

  //正则匹配播放地址
  const reg = /"https:\/\/www.douban.com\/link2\/\?url\=(.*?)"/g;

  const match = [...html.matchAll(reg)];

  //获取地址，解码，去掉查询字符串，替换http为https
  const urls = match
    .map(item =>
      decodeURIComponent(item[1]).split("?")[0].replace("http://", "https://")
    )
    .filter(url => !url.includes("migu"));

  //去重
  const res = [...new Set(urls)];

  //如果没有获取到地址
  if (res.length == 0) {
    return {
      status: 404,
      data: [],
    };
  }

  //返回地址
  return {
    status: 200,
    data: res,
  };
});

//搜索
type searchOption = {
  keyword: string;
  cookie: string;
};

ipcMain.handle("search", async (_, option: searchOption) => {
  const { keyword, cookie } = option;

  const url = `https://search.douban.com/movie/subject_search?search_text=${keyword}`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
    headers: {
      cookie,
    },
  });

  //获取返回的html
  const html = await response.text();

  //检测是否被封禁
  if (html.includes("有异常请求从你的 IP 发出")) {
    return {
      status: 403,
      data: [],
    };
  }

  //解析html获取数据
  const getData = (html: string) => {
    type Result = {
      title: string;
      cover_url: string;
      id: string;
      labels: object[];
    };

    const data: Result[] = JSON.parse(
      html.match(/window.__DATA__ = (.*?);/)![1]
    ).items;

    return data;
  };

  const data = getData(html);

  //过滤掉不能播放的数据
  const res = data
    .filter(item => item.labels && item.labels.length != 0)
    .map(item => ({
      name: item.title.replace(/\((.*?)\)/, ""),
      year: item.title.match(/\((.*?)\)/)![1],
      img: item.cover_url,
      id: item.id,
    }));

  if (res.length == 0) {
    return {
      status: 404,
      data: [],
    };
  }

  return {
    status: 200,
    data: res,
  };
});

//检查更新
ipcMain.handle("checkForUpdates", async () => {
  const res = await autoUpdater.checkForUpdates();

  const newVersion = res?.updateInfo.version;

  if (newVersion !== autoUpdater.currentVersion.version) {
    return newVersion;
  }

  return false;
});
