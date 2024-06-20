import { Set } from "@type";

export const useSetStore = defineStore("set", () => {
  const data = ref<Set>({
    speed: "",
    forward: "",
    backward: "",
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
  }

  init();

  return {
    data,
    version,
  };
});
