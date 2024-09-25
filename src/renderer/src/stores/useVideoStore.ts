import { List, ListItem } from "@type";
import { nanoid } from "nanoid";
import { useConfigStore } from "./useConfigStore";

export const useVideoStore = defineStore("list", () => {
  const configStore = useConfigStore();

  //数据
  const data = ref<List>([]);

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
      api.updateDb(JSON.parse(JSON.stringify(val)));
    },
    {
      deep: true,
    }
  );

  //添加
  const add = (name: string, url: string) => {
    const id = nanoid();

    const newData = {
      name,
      url,
      jumpStart: "00:00:00",
      jumpEnd: "00:00:00",
      id,
    };

    data.value.push(newData);

    selectedID.value = id;
    configStore.data.history = id;
  };

  //移除
  const remove = (id: string) => {
    const index = data.value.findIndex(item => item.id == id);

    data.value.splice(index, 1);
  };

  //更新
  const update = (newVal: ListItem, callback: Function) => {
    const index = data.value.findIndex(item => item.id == selectedID.value);

    if (JSON.stringify(data.value[index]) != JSON.stringify(newVal)) {
      data.value[index] = newVal;
      callback();
    }
  };

  //初始化
  const init = async () => {
    const res = await api.getDb();

    if (!res) return;

    data.value = res;
  };

  init();

  return {
    data,
    selectedID,
    selectedVideo,
    add,
    remove,
    update,
  };
});
