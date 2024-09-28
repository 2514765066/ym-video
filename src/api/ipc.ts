import { ipcMain } from "./ipcMain";
import { windows } from "ym-electron.js";
import { webContents } from "electron";
import { readJson, writeJson } from "../api/fs";

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

//禁止打开新标签页
ipcMain.handle("denyNewWindow", (_, id) => {
  const web = webContents.fromId(id);

  web?.setWindowOpenHandler(({ url }) => {
    web.loadURL(url);

    return { action: "deny" };
  });
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
