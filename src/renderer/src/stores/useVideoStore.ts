import { SearchInfo, VideoInfo } from "@type";
import eventEmitter from "@/hooks/eventEmitter";

export const useVideoStore = defineStore("list", () => {
  const router = useRouter();

  //数据
  const data = ref<VideoInfo[]>([]);

  //当前选中名称
  const selectedName = ref("");

  //当前选中video
  const selectedVideo = computed<VideoInfo>(() => {
    return (
      data.value.find(item => item.name == selectedName.value) || {
        name: "",
        history: 0,
        url: [],
        pic: "",
        time: Date.now(),
      }
    );
  });

  //当前选中的集数
  const selectEpisode = computed(() => {
    return selectedVideo.value.url[selectedVideo.value.history];
  });

  const add = (option: SearchInfo) => {
    if (has(option.name)) {
      selectedName.value = option.name;
      router.push("/play");
      return;
    }

    const insertData = {
      ...option,
      time: Date.now(),
      history: 0,
    };

    //插入
    ipcRenderer.send("insert", insertData.name, JSON.stringify(insertData));

    data.value.unshift(insertData);

    selectedName.value = option.name;
    router.push("/play");
  };

  //判断是否存在
  const has = (name: string) => {
    return data.value.some(item => item.name == name);
  };

  //放在最前面
  const before = (name: string) => {
    const item = remove(name, false);

    item.time = Date.now();

    //修改
    ipcRenderer.send("update", item.name, JSON.stringify(item));

    data.value.unshift(item);

    selectedName.value = name;
  };

  //移除
  const remove = (name: string, isRemove: boolean = true) => {
    const index = data.value.findIndex(item => item.name == name);

    if (isRemove) {
      //删除
      ipcRenderer.send("remove", name);
    }

    return data.value.splice(index, 1)[0];
  };

  //播放
  const play = async (name: string) => {
    //存在直接播放
    if (has(name)) {
      before(name);
      router.push("/play");
      return;
    }

    //获取url
    try {
      const res = await api.getFilm(name);

      if (!res) {
        eventEmitter.emit("error:show", "暂时没有资源");
        return;
      }

      //添加资源
      add(res);
    } catch {
      eventEmitter.emit("error:show", "请求资源失败，请稍后再试");
    }
  };

  //更新集数
  const update = async (name: string) => {
    const item = data.value.find(item => item.name == name)!;

    const res = await api.getFilm(name);

    item.url = res!.url;

    //修改
    ipcRenderer.send("update", item.name, JSON.stringify(item));
  };

  //初始化
  const init = async () => {
    const res = await ipcRenderer.invoke("select");

    data.value = res
      .map(item => JSON.parse(item))
      .sort((a, b) => b.time - a.time);

    //监视更新值
    watch(
      selectedVideo,
      (val, old) => {
        if (val.name != old.name) {
          return;
        }

        ipcRenderer.send("update", val.name, JSON.stringify(val));
      },
      {
        deep: true,
      }
    );
  };

  init();

  return {
    data,
    selectedName,
    selectedVideo,
    selectEpisode,
    add,
    has,
    remove,
    before,
    play,
    update,
  };
});
