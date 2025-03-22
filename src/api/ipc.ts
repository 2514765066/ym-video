import { ipcMain } from "./ipcMain";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { resources } from "./path";
import { fetchWithRetry } from "./tools";
import { BrowserWindow, dialog } from "electron";

//读取配置
ipcMain.handle("readConfig", async () => {
  const path = join(resources, "db.json");

  if (!existsSync(path)) {
    return "";
  }

  const res = await readFile(path);

  return res.toString();
});

//写入配置
ipcMain.on("writeConfig", async (_, data) => {
  if (!existsSync(resources)) {
    await mkdir(resources);
  }

  const path = join(resources, `db.json`);

  await writeFile(path, data);
});

//获取图片
ipcMain.handle("getImg", async (_, url) => {
  const response = await fetchWithRetry(url);

  const data = await response.arrayBuffer();

  return `data:image/jpeg;base64,${Buffer.from(data).toString("base64")}`;
});

//获取图片
ipcMain.handle("getTitle", async (_, url) => {
  const response = await fetch(url);

  const html = await response.text();

  return html.match(/<title>(.*?)<\/title>/)![1];
});

//获取热门电影
ipcMain.handle("getRecommend", async (_, option) => {
  const { type, start = 0 } = option;

  const url = `https://m.douban.com/rexxar/api/v2/${type}/recommend?refresh=0&start=${start}&count=20&uncollect=false&sort=U`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
  });

  const data = await response.json();

  return data.items.map((item: any) => {
    return {
      name: item.title,
      pic: item.pic.normal,
      sub: item.card_subtitle,
    };
  });
});

//导出历史记录
ipcMain.on("exportConfig", async ({ sender }, data) => {
  const win = BrowserWindow.fromWebContents(sender)!;

  const res = await dialog.showOpenDialog(win, {
    title: "选择导出到的文件夹",

    properties: ["openDirectory"],
  });

  if (res.canceled) {
    return;
  }

  const path = join(res.filePaths[0], "ym-video-config.json");

  writeFile(path, data);
});

//导入历史记录
ipcMain.handle("importConfig", async ({ sender }) => {
  const win = BrowserWindow.fromWebContents(sender)!;

  const dialogOption = await dialog.showOpenDialog(win, {
    title: "选择导入的文件",
    properties: ["openFile"],
    filters: [
      {
        name: "ym-video配置文件",
        extensions: ["json"],
      },
    ],
  });

  if (dialogOption.canceled) {
    return "";
  }

  const path = dialogOption.filePaths[0];

  const res = await readFile(path);

  return res.toString();
});
