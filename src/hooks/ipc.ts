import { ipcMain } from "./useIpcMain";
import { windows } from "ym-electron.js";
import { webContents } from "electron";

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
