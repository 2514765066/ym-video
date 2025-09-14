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
        currentTime: 0,
        pic: "",
        duration: 0,
      }
    );
  });

  //历史列表
  const historyList = computed(() => {
    return Array.from({ length: selectedVideo.value.url.length }, (_, i) => ({
      label: i + 1,
      value: i,
    }));
  });

  //添加
  type AddOption = {
    name: string;
    pic: string;
    url: string[];
  };

  const add = (option: AddOption) => {
    data.value.unshift({
      ...option,
      minVersion: __APP_VERSION__,
      history: 0,
      currentTime: 0,
      duration: 0,
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
  const play = async (name: string, pic: string = "") => {
    //存在直接播放
    if (has(name)) {
      before(name);
      router.push("/play");
      return;
    }

    //获取url
    try {
      const url = await api.getUrl(name);

      if (url.length == 0) {
        eventEmitter.emit("error:show", "暂时没有资源");
        return;
      }

      //添加资源
      add({
        name,
        pic,
        url,
      });
    } catch {
      eventEmitter.emit("error:show", "请求资源失败，请稍后再试");
    }
  };

  //更新集数
  const update = async (name: string) => {
    const item = data.value.find(item => item.name == name)!;

    item.url = await api.getUrl(name);
  };

  //删除所有记录
  const removeConfig = () => {
    data.value = [];
  };

  //初始化
  const init = async () => {
    const res = await ipcRenderer.invoke("readConfig");

    if (res) {
      const json: VideoInfo[] = JSON.parse(res);

      data.value = json.filter(({ minVersion }) => validateVersion(minVersion));
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
    historyList,
    add,
    has,
    remove,
    before,
    play,
    update,

    removeConfig,
  };
});
