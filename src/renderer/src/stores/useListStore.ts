import { List, ListItem } from "@type";

export const useListStore = defineStore("list", () => {
  const data = ref<List>([]);

  //当前选中名称
  const selectedName = ref("");

  //当前选中video
  const selectedVideo = computed(() => {
    return data.value.find(item => item.name == selectedName.value);
  });

  //当前编辑名称
  const editName = ref("");

  //当前编辑video
  const editVideo = computed({
    get() {
      return data.value.find(item => item.name == editName.value) as ListItem;
    },
    set(val: ListItem) {
      const index = data.value.findIndex(item => item.name == editName.value);
      data.value[index] = val;
    },
  });

  //已经存在的名称
  const hasNames = computed(() => {
    return data.value
      .map(item => item.name)
      .filter(item => item != editName.value);
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
  function push({ name, url }: { name: string; url: string }) {
    data.value.push({
      name,
      url,
      jumpStart: "00:00:00",
      jumpEnd: "00:00:00",
    });
  }

  //移除
  function remove(name: string) {
    const index = data.value.findIndex(item => item.name == name);

    data.value.splice(index, 1);
  }

  //初始化
  async function init() {
    data.value = await api.getDb();
  }

  init();

  return {
    data,
    selectedName,
    selectedVideo,
    editName,
    editVideo,
    hasNames,
    push,
    remove,
  };
});
