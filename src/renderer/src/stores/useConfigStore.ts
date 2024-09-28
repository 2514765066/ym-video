export const useConfigStore = defineStore("config", () => {
  const data = ref({
    history: "",
  });

  //版本
  const version = ref(`v${__APP_VERSION__}`);

  //监视更新值
  watch(
    data,
    val => {
      electron.ipcRenderer.invoke(
        "writeConfig",
        "config",
        JSON.parse(JSON.stringify(val))
      );
    },
    {
      deep: true,
    }
  );

  //初始化
  const init = async () => {
    const res = await electron.ipcRenderer.invoke("readConfig", "config");

    if (!res) return;

    data.value = res;
  };

  init();

  return {
    data,
    version,
  };
});
