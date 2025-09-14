import { MovieInfo } from "@type";
import { closeLoading, openLoading } from "@/components/Loading";

export const useMovieStore = defineStore("movie", () => {
  //电影数据
  const movieData = ref<MovieInfo[]>([]);

  //获取资源
  const getData = async () => {
    return await ipcRenderer.invoke("getRecommend", {
      type: "movie",
      start: movieData.value.length,
    });
  };

  //初始化
  const initData = async () => {
    openLoading();

    movieData.value = await getData();

    closeLoading();
  };

  //获取电影数据
  const getMovieData = async () => {
    const data = await getData();

    movieData.value.push(...data);
  };

  initData();

  return {
    movieData,
    getMovieData,
  };
});
