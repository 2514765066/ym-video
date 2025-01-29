import { VideoInfo } from "@type";
import { validateVersion } from "@/utils/validate";

export const useVideoStore = defineStore("list", () => {
  //数据
  const data = ref<VideoInfo[]>([]);

  //当前选中id
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

  //初始化
  const init = async () => {
    const res: VideoInfo[] = await api.read();

    data.value = res.filter(({ minVersion }) => validateVersion(minVersion));

    //监视更新值
    watchEffect(() => {
      api.write(JSON.stringify(data.value));
    });
  };

  init();

  return {
    data,
    selectedVideo,
    add,
    has,
    remove,
    before,
  };
});
