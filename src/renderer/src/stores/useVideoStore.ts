import { VideoInfo } from "@type";
import { useLoading } from "@/utils/loading";
import { validateVersion } from "@/utils/validate";
import eventEmitter from "@/hooks/eventEmitter";
import { useAppStore } from "@/stores/useAppStore";

export const useVideoStore = defineStore("list", () => {
  const router = useRouter();
  const getUrl = useLoading(api.getUrl);
  const { version } = useAppStore();

  //数据
  const data = ref<VideoInfo[]>([]);

  //当前选中名称
  const selectedName = ref("");

  //当前选中video
  const selectedVideo = computed(() => {
    return data.value.find(item => item.name == selectedName.value);
  });

  //添加
  const add = (info: VideoInfo) => {
    data.value.unshift(info);

    selectedName.value = info.name;
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
    const url = await getUrl(name);

    if (url.length == 0) {
      eventEmitter.emit("error:show", "暂时没有资源");
      return;
    }

    //不存在添加
    add({
      name,
      pic,
      history: 0,
      url,
      minVersion: version,
      currentTime: 0,
    });

    router.push("/play");
  };

  //更新集数
  const update = async (name: string) => {
    const item = data.value.find(item => item.name == name)!;

    item.url = await api.getUrl(name);
  };

  //初始化
  const init = async () => {
    const res = await ipcRenderer.invoke("readConfig");

    if (!res) return;

    const json: VideoInfo[] = JSON.parse(res);

    data.value = json.filter(({ minVersion }) => validateVersion(minVersion));

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
    add,
    has,
    remove,
    before,
    play,
    update,
  };
});
