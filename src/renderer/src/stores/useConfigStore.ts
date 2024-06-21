import { Set } from "@type";
import { useListStore } from "./useListStore";

export const useConfigStore = defineStore("config", () => {
  const list = useListStore();

  const data = ref<Set>({
    history: "",
  });

  //版本
  const version = ref(__APP_VERSION__);

  //监视更新值
  watch(
    data,
    val => {
      api.updateConfig(JSON.parse(JSON.stringify(val)));
    },
    {
      deep: true,
    }
  );

  //初始化
  async function init() {
    data.value = await api.getConfig();
    list.selectedID = data.value.history;
  }

  init();

  return {
    data,
    version,
  };
});
