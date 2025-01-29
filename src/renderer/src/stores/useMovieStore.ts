import { MovieInfo } from "@type";
import { debounce } from "@/utils/debounce";

export const useMovieStore = defineStore("movie", () => {
  //最大列数
  const colCount = ref(0);

  //电影数据
  const movieData = ref<MovieInfo[]>([]);

  //电影数据应该显示的数量
  const movieDataShow = computed(() => {
    const count =
      Math.floor(movieData.value.length / colCount.value) * colCount.value;

    return movieData.value.slice(0, count);
  });

  //电视剧数据
  const tvData = ref<MovieInfo[]>([]);

  //电影数据应该显示的数量
  const tvDataShow = computed(() => {
    const count =
      Math.floor(tvData.value.length / colCount.value) * colCount.value;

    return tvData.value.slice(0, count);
  });

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

  //获取电视剧数据
  const getTvData = async () => {
    const option = {
      type: "tv",
      start: movieData.value.length,
    };

    const data: MovieInfo[] = await electron.ipcRenderer.invoke(
      "getRecommend",
      option
    );

    tvData.value.push(...data);
  };

  //大小改变
  const resize = debounce(() => {
    const width = window.innerWidth - 320 - 109;
    const gap = 16;
    const itemWidth = 170;

    colCount.value = Math.floor((width + gap) / (itemWidth + gap));
  });

  resize();

  window.addEventListener("resize", resize);

  getMovieData();
  getTvData();

  return {
    colCount,
    movieData,
    tvData,
    movieDataShow,
    tvDataShow,
    getMovieData,
    getTvData,
  };
});
