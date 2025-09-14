import { MovieInfo } from "@type";
import { openLoading, closeLoading } from "@/components/Loading";

export const useTvStore = defineStore("tv", () => {
  //电视剧数据
  const tvData = ref<MovieInfo[]>([]);

  //获取资源
  const getData = async () => {
    return await ipcRenderer.invoke("getRecommend", {
      type: "tv",
      start: tvData.value.length,
    });
  };

  //初始化
  const initData = async () => {
    openLoading();

    tvData.value = await getData();

    closeLoading();
  };

  //获取电视剧数据
  const getTvData = async () => {
    const data = await getData();

    tvData.value.push(...data);
  };

  initData();

  return {
    tvData,
    getTvData,
  };
});
