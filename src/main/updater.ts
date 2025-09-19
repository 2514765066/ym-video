import { dialog } from "electron";
import { autoUpdater } from "electron-updater";
import { browserWindows } from "@/bw/windows";
import { ADDRESS } from "@/updater-server";

//开发模式测试更新
// autoUpdater.forceDevUpdateConfig = true;

//设置自定义服务端
autoUpdater.setFeedURL(ADDRESS);

//关闭web安装器
autoUpdater.disableWebInstaller = true;

//关闭差异下载
autoUpdater.disableDifferentialDownload = true;

//下载完成
autoUpdater.on("update-downloaded", async () => {
  const win = browserWindows.get("manage")!;

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

autoUpdater.checkForUpdatesAndNotify();
