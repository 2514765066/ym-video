import { Config } from "@type";

export const useConfigStore = defineStore("config", () => {
  const data = ref<Config>({
    historyCount: 20,
  });

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
    const res: Config = await electron.ipcRenderer.invoke(
      "readConfig",
      "config"
    );

    data.value.historyCount = res.historyCount;
  };

  init();

  return {
    data,
  };
});
