import { MovieInfo } from "@type";

export const useMovieStore = defineStore("movie", () => {
  //电影数据
  const movieData = ref<MovieInfo[]>([]);

  //获取电影数据
  const getMovieData = async () => {
    const data = await ipcRenderer.invoke("getRecommend", {
      type: "movie",
      start: movieData.value.length,
    });

    movieData.value.push(...data);
  };

  getMovieData();

  return {
    movieData,
    getMovieData,
  };
});
