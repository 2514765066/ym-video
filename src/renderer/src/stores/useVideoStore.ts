import { VideoInfo } from "@type";
import { useLoading } from "@/utils/loading";
import { validateVersion } from "@/utils/validate";
import eventEmitter from "@/hooks/eventEmitter";

export const useVideoStore = defineStore("list", () => {
  const router = useRouter();
  const getUrl = useLoading(api.getUrl);

  //数据
  const data = ref<VideoInfo[]>([]);

  //当前选中名称
  const selectedName = ref("");

  //当前选中video
  const selectedVideo = computed(() => {
    return data.value.find(item => item.name == selectedName.value);
  });

  //添加
  const add = (info: Partial<VideoInfo>) => {
    const { name = "", url = [], pic = "" } = info;

    data.value.unshift({
      name,
      url,
      pic,
      minVersion: __APP_VERSION__,
      history: 0,
      currentTime: 0,
    });

    selectedName.value = name;
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
    const url = await getUrl(name);

    if (url.length == 0) {
      eventEmitter.emit("error:show", "暂时没有资源");
      return;
    }

    //不存在添加
    add({
      name,
      pic,
      url,
    });
  };

  //更新集数
  const update = async (name: string) => {
    const item = data.value.find(item => item.name == name)!;

    try {
      item.url = await api.getUrl(name);
      eventEmitter.emit("success:show", "更新成功");
    } catch {
      eventEmitter.emit("error:show", "更新失败");
    }
  };

  //导出
  const exportConfig = async (name?: string) => {
    let exportData = JSON.stringify(data.value);

    if (name) {
      exportData = JSON.stringify([data.value.find(item => item.name == name)]);
    }

    const res = await ipcRenderer.invoke("exportConfig", exportData);

    if (res) {
      eventEmitter.emit("success:show", "导出成功");
    }
  };

  //导入
  const importConfig = async () => {
    const res = await ipcRenderer.invoke("importConfig");

    if (!res) return;

    const importData = JSON.parse(res);

    if (!Array.isArray(importData)) {
      eventEmitter.emit("error:show", "导入失败，无法导入修改后的记录");
      return;
    }

    const filterData = importData.filter(item => {
      return !has(item.name) && validateVersion(item.minVersion);
    });

    data.value.unshift(...filterData);
    eventEmitter.emit("success:show", "导入成功");
  };

  //删除所有记录
  const removeConfig = () => {
    data.value = [];
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
    importConfig,
    exportConfig,
    removeConfig,
  };
});
