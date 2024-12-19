import { VideoInfo } from "@type";
import { useConfigStore } from "./useConfigStore";
import { validateKey } from "@/hooks/useValidate";

export const useVideoStore = defineStore("list", () => {
  const configStore = useConfigStore();

  //数据
  const data = ref<VideoInfo[]>([]);

  //当前选中id
  const selectedID = ref("");

  //当前选中video
  const selectedVideo = computed(() => {
    return data.value.find(item => item.id == selectedID.value);
  });

  //监视更新值
  watch(
    data,
    val => {
      electron.ipcRenderer.invoke(
        "writeConfig",
        "db",
        JSON.parse(JSON.stringify(val))
      );
    },
    {
      deep: true,
    }
  );

  //添加
  const add = (info: VideoInfo) => {
    data.value.unshift(info);

    selectedID.value = info.id;
  };

  //判断是否存在
  const has = (id: string) => {
    const res = data.value.some(item => item.id == id);

    if (res) {
      const item = remove(id);
      data.value.unshift(item);
      selectedID.value = id;
    }

    return res;
  };

  //移除
  const remove = (id: string) => {
    const index = data.value.findIndex(item => item.id == id);

    return data.value.splice(index, 1)[0];
  };

  //初始化
  const init = async () => {
    const res: VideoInfo[] = await electron.ipcRenderer.invoke(
      "readConfig",
      "db"
    );

    const validateObj = {
      name: "",
      year: "",
      img: "",
      id: "",
      url: "",
    };

    //验证数据是否合法
    if (!validateKey(res[0], validateObj)) return;

    //最大历史记录数量
    if (res.length > configStore.data.historyCount) {
      data.value = res.slice(0, configStore.data.historyCount);
      return;
    }

    data.value = res;
  };

  init();

  return {
    data,
    selectedID,
    selectedVideo,
    add,
    has,
    remove,
  };
});
