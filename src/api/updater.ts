import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { mainWindow } from "../main/manage";
import { ipcMain } from "./ipcMain";
import { isDev } from "ym-electron.js";

//开发模式测试更新
autoUpdater.forceDevUpdateConfig = isDev();

//下载进度
autoUpdater.on("download-progress", ({ percent }) => {
  mainWindow.instance!.webContents.send("downloadProgress", percent);
});

//下载完成
autoUpdater.on("update-downloaded", async () => {
  mainWindow.instance!.webContents.send("downloadProgress", 100);

  const res = await dialog.showMessageBox(mainWindow.instance!, {
    type: "info",
    title: "更新",
    message: "更新下载完成点击确定更新软件",
    buttons: ["ok", "cancel"],
  });

  if (res.response != 0) {
    return;
  }

  autoUpdater.quitAndInstall(true, true);
});

//检查是否有更新
ipcMain.handle("checkForUpdates", async () => {
  const res = await autoUpdater.checkForUpdatesAndNotify();

  return res?.updateInfo.version;
});
