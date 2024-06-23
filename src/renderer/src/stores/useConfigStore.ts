import { Config } from "@type";
import { useListStore } from "./useListStore";
import { load } from "@/hooks/useVideo";

export const useConfigStore = defineStore("config", () => {
  const list = useListStore();

  const data = ref<Config>();

  //版本
  const version = ref(__APP_VERSION__);

  //监视更新值
  watch(
    data,
    val => {
      api.updateConfig(JSON.parse(JSON.stringify(val)));

      if (list.selectedVideo) {
        load().importJs();
      }
    },
    {
      deep: true,
    }
  );

  //初始化
  async function init() {
    data.value = (await api.getConfig()) as Config;
    list.selectedID = data.value.history;
  }

  init();

  return {
    data,
    version,
  };
});
