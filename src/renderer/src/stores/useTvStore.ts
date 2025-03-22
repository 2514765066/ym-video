import { MovieInfo } from "@type";

export const useTvStore = defineStore("tv", () => {
  //电视剧数据
  const tvData = ref<MovieInfo[]>([]);

  //获取电视剧数据
  const getTvData = async () => {
    const data = await ipcRenderer.invoke("getRecommend", {
      type: "tv",
      start: tvData.value.length,
    });

    tvData.value.push(...data);
  };

  getTvData();

  return {
    tvData,
    getTvData,
  };
});
