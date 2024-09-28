import { autoUpdater } from "electron-updater";
import { onMounted, windows } from "ym-electron.js";
import { dialog, shell } from "electron";
import { ipcMain } from "./ipcMain";

onMounted(() => {
  autoUpdater.checkForUpdates();
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;

  //自动更新
  ipcMain.on("autoUpdate", () => {
    autoUpdater.downloadUpdate();
  });

  //手动更新
  ipcMain.on("manualUpdate", () => {
    shell.openExternal("https://github.com/2514765066/ym-video/releases");
  });

  //有新的更新
  autoUpdater.on("update-available", () => {
    windows.get("manage")?.webContents.send("update-available");
  });

  //更新错误
  autoUpdater.on("error", () => {
    windows.get("manage")?.webContents.send("update-error");
  });

  // 下载进度
  autoUpdater.on("download-progress", ({ percent }) => {
    windows.get("manage")?.webContents.send("msg", percent);
    windows.get("manage")?.webContents.send("download-progress", percent);
  });

  // 处理下载完成的情况
  autoUpdater.on("update-downloaded", async () => {
    await dialog.showMessageBox({
      type: "info",
      title: "更新下载完成",
      message: "点击确定重启更新版本",
      buttons: ["确定"],
    });

    autoUpdater.quitAndInstall();
  });
});
