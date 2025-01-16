export const useVersionStore = defineStore("version", () => {
  const version = __APP_VERSION__;

  //最新版本
  const latestVersion = ref("");

  //更新进度
  const percentage = ref(0);

  //查看是否有更新
  const checkForUpdates = async () => {
    const res = await api.checkForUpdates();

    if (res && res != version) {
      latestVersion.value = res;
    }
  };

  electron.ipcRenderer.on("downloadProgress", (_, percent: number) => {
    percentage.value = Math.floor(percent);
  });

  checkForUpdates();

  return {
    version,
    latestVersion,
    percentage,
  };
});
