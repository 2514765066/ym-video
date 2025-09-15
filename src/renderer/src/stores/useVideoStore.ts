import { VideoInfo } from "@type";
import { validateVersion } from "@/utils/validate";
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
        minVersion: "",
        pic: "",
      }
    );
  });

  //当前选中的集数
  const selectEpisode = computed(() => {
    return selectedVideo.value.url[selectedVideo.value.history];
  });

  //添加
  type AddOption = {
    name: string;
    pic: string;
    url: {
      value: number;
      url: string;
      duration: number;
      currentTime: number;
    }[];
  };

  const add = (option: AddOption) => {
    data.value.unshift({
      ...option,
      minVersion: __APP_VERSION__,
      history: 0,
      // currentTime: 0,
      // duration: 0,
    });

    selectedName.value = option.name;
    router.push("/play");
  };

  //判断是否存在
  const has = (name: string) => {
    return data.value.some(item => item.name == name);
  };

  //放在最前面
  const before = (name: string) => {
    const item = remove(name);
    data.value.unshift(item);
    selectedName.value = name;
  };

  //移除
  const remove = (name: string) => {
    const index = data.value.findIndex(item => item.name == name);

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
  };

  //初始化
  const init = async () => {
    const res = await ipcRenderer.invoke("readConfig");

    if (res) {
      const json: VideoInfo[] = JSON.parse(res);

      const result = json.filter(({ minVersion }) =>
        validateVersion(minVersion)
      );

      data.value = result;
    }

    //监视更新值
    watch(
      data,
      val => {
        ipcRenderer.send("writeConfig", JSON.stringify(val));
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
