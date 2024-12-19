import { validateKey } from "@/hooks/useValidate";

export const useConfigStore = defineStore("config", () => {
  const data = ref({
    historyCount: 20,
    cookie: "",
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
    const res = await electron.ipcRenderer.invoke("readConfig", "config");

    if (!validateKey(res, data.value)) return;

    data.value = res;
  };

  init();

  return {
    data,
  };
});
