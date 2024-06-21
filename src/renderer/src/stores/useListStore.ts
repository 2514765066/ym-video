import { List, ListItem } from "@type";
import { nanoid } from "nanoid";

export const useListStore = defineStore("list", () => {
  const data = ref<List>([]);

  //当前选中id
  const selectedID = ref("");

  //当前选中video
  const selectedVideo = computed(() => {
    return data.value.find(item => item.id == selectedID.value);
  });

  //当前编辑id
  const editID = ref("");

  //当前编辑video
  const editVideo = computed({
    get() {
      return data.value.find(item => item.id == editID.value) as ListItem;
    },
    set(val: ListItem) {
      const index = data.value.findIndex(item => item.id == editID.value);
      data.value[index] = val;
    },
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
  function create({ name, url }: { name: string; url: string }) {
    data.value.push({
      name,
      url,
      jumpStart: "00:00:00",
      jumpEnd: "00:00:00",
      defaultRate: 1,
      id: nanoid(),
    });
  }

  //移除
  function remove(id: string) {
    const index = data.value.findIndex(item => item.id == id);

    data.value.splice(index, 1);
  }

  //初始化
  async function init() {
    data.value = await api.getDb();
  }

  init();

  return {
    data,
    selectedID,
    editID,
    selectedVideo,
    editVideo,
    create,
    remove,
  };
});
