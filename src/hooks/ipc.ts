import { ipcMain } from "electron";
import { windows } from "ym-electron.js";
import { EventNames } from "../type";

//最小化
ipcMain.on<EventNames>("minimize", () => {
  const win = windows.get("manage")!;
  win.minimize();
});

//最大化还原
ipcMain.on<EventNames>("maximize", () => {
  const win = windows.get("manage")!;
  win.isMaximized() ? win.restore() : win.maximize();
});

//关闭
ipcMain.on<EventNames>("close", () => {
  const win = windows.get("manage")!;
  win.close();
});
