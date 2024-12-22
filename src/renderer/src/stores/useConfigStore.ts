import { Config } from "@type";
import { filterObj } from "@/hooks/useFilterObj";

export const useConfigStore = defineStore("config", () => {
  const data = ref<Config>({
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

    //过滤obj
    const obj = filterObj(res, ([key]) => key in data.value) as Config;

    if (Object.keys(obj).length == 0) {
      return;
    }

    data.value = obj;
  };

  init();

  return {
    data,
  };
});
