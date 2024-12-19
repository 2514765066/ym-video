import { MovieInfo } from "@type";

export const useMovieStore = defineStore("movie", () => {
  //电影数据
  const movieData = ref<MovieInfo[]>([]);

  //电视剧数据
  const tvData = ref<MovieInfo[]>([]);

  //获取电影数据
  const getMovieData = async () => {
    const option = {
      type: "movie",
      start: movieData.value.length,
    };

    const data: MovieInfo[] = await electron.ipcRenderer.invoke(
      "getMovie",
      option
    );

    movieData.value.push(...data);
  };

  //获取电视剧数据
  const getTvData = async () => {
    const option = {
      type: "tv",
      start: tvData.value.length,
    };

    const data: MovieInfo[] = await electron.ipcRenderer.invoke(
      "getMovie",
      option
    );

    tvData.value.push(...data);
  };

  getMovieData();
  getTvData();

  return {
    movieData,
    tvData,
    getMovieData,
    getTvData,
  };
});
