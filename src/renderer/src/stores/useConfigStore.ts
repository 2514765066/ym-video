import { useVideoStore } from "./useVideoStore";

export const useConfigStore = defineStore("config", () => {
  const videoStore = useVideoStore();

  const data = ref({
    history: "",
  });

  //版本
  const version = ref(`v${__APP_VERSION__}`);

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
  const init = async () => {
    data.value = await api.getConfig();

    if (data.value.history) {
      videoStore.selectedID = data.value.history;
    }
  };

  init();

  return {
    data,
    version,
  };
});
