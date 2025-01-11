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
