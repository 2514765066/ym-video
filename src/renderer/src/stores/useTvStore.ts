import { MovieInfo } from "@type";

export const useTvStore = defineStore("tv", () => {
  //电视剧数据
  const tvData = ref<MovieInfo[]>([]);

  //获取电视剧数据
  const getTvData = async () => {
    const option = {
      type: "tv",
      start: tvData.value.length,
    };

    const data: MovieInfo[] = await electron.ipcRenderer.invoke(
      "getRecommend",
      option
    );

    tvData.value.push(...data);
  };

  getTvData();

  return {
    tvData,
    getTvData,
  };
});
