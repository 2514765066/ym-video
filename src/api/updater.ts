import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { mainWindow } from "../main/manage";
import { onMounted } from "ym-electron.js";

//开发模式测试更新
autoUpdater.forceDevUpdateConfig = true;

//关闭应用不自动更新
autoUpdater.autoInstallOnAppQuit = false;

//下载完成
autoUpdater.on("update-downloaded", async () => {
  await onMounted();

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

autoUpdater.checkForUpdatesAndNotify();
