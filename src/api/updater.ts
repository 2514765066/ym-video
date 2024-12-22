import { autoUpdater } from "electron-updater";
// import { app } from "electron";
// import { join } from "path";

autoUpdater.autoDownload = false;

//开发模式测试更新
// autoUpdater.updateConfigPath = join(__dirname, "../../app-update.yml");
// Object.defineProperty(app, "isPackaged", {
//   get() {
//     return true;
//   },
// });

export { autoUpdater };

// autoUpdater.autoInstallOnAppQuit = true;
// onMounted(async () => {
//   autoUpdater.checkForUpdates();

//   //有新的更新
//   autoUpdater.on("update-available", () => {
//     autoUpdater.downloadUpdate();
//   });

//   // 处理下载完成的情况
//   autoUpdater.on("update-downloaded", async () => {
//     await dialog.showMessageBox({
//       type: "info",
//       title: "更新下载完成",
//       message: "点击确定重启更新版本",
//       buttons: ["确定"],
//     });

//     autoUpdater.quitAndInstall();
//   });
// });
