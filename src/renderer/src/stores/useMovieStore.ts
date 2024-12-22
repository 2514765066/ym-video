import { MovieInfo } from "@type";
import { debounce } from "@/hooks/useDebounce";

export const useMovieStore = defineStore("movie", () => {
  //最大列数
  const colCount = ref(0);

  //电影数据
  const movieData = ref<MovieInfo[]>([]);

  //电影数据应该显示的数量
  const movieDataShowCount = computed(() => {
    return Math.floor(movieData.value.length / colCount.value) * colCount.value;
  });

  //电视剧数据
  const tvData = ref<MovieInfo[]>([]);

  //电影数据应该显示的数量
  const tvDataShowCount = computed(() => {
    return Math.floor(tvData.value.length / colCount.value) * colCount.value;
  });

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

  //大小改变
  const resize = debounce(() => {
    const width = window.innerWidth - 320 - 54.5 * 2;
    const gap = 16;
    const itemWidth = 140;

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
    movieDataShowCount,
    tvDataShowCount,
    getMovieData,
    getTvData,
  };
});
