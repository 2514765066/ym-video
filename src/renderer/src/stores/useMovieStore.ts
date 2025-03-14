import { MovieInfo } from "@type";

export const useMovieStore = defineStore("movie", () => {
  //电影数据
  const movieData = ref<MovieInfo[]>([]);

  //获取电影数据
  const getMovieData = async () => {
    const option = {
      type: "movie",
      start: movieData.value.length,
    };

    const data: MovieInfo[] = await electron.ipcRenderer.invoke(
      "getRecommend",
      option
    );

    movieData.value.push(...data);
  };

  getMovieData();

  return {
    movieData,
    getMovieData,
  };
});
