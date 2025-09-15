import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
// import { isDev } from "ym-electron.js";
import { browserWindows } from "./windows";

//开发模式测试更新
// autoUpdater.forceDevUpdateConfig = isDev();

//下载完成
autoUpdater.on("update-downloaded", async () => {
  const win = browserWindows.get("manage")!;

  // win.webContents.send("downloadProgress", 100);

  const res = await dialog.showMessageBox(win, {
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

// //发现更新
// autoUpdater.on("update-available", info => {
//   const win = browserWindows.get("manage")!;

//   win.webContents.send("updateAvailable", info.version);
// });

// //下载进度
// autoUpdater.on("download-progress", progress => {
//   const win = browserWindows.get("manage")!;

//   win.webContents.send("downloadProgress", progress.percent);
// });

autoUpdater.checkForUpdatesAndNotify();
