import { SearchInfo, VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";

export const useSearchStore = defineStore("search", () => {
  const { data } = storeToRefs(useVideoStore());

  //关键词
  const keyword = ref("");

  //已存在的数据
  const hasData = ref<VideoInfo[]>([]);

  //电影数据
  const searchData = ref<SearchInfo[]>([]);

  //状态
  const state = ref<"init" | "loading" | "finish" | "empty">("init");

  //搜索数据
  const getSearchData = async () => {
    if (state.value == "loading") {
      return;
    }

    state.value = "loading";

    hasData.value = [];

    hasData.value = data.value.filter(item =>
      item.name.includes(keyword.value)
    );

    searchData.value = [];

    searchData.value = await api.search(keyword.value.trim());

    if (!searchData.value.length && !hasData.value.length) {
      state.value = "empty";
      return;
    }

    state.value = "finish";
  };

  //重置
  const reset = () => {
    keyword.value = "";
    searchData.value = [];
    state.value = "init";
  };

  return {
    keyword,
    state,
    searchData,
    hasData,
    getSearchData,
    reset,
  };
});
