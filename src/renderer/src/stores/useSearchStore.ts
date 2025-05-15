import { SearchInfo } from "@type";

export const useSearchStore = defineStore("search", () => {
  //关键词
  const keyword = ref("");

  //电影数据
  const searchData = ref<SearchInfo[]>([]);

  //状态
  const state = ref<"loading" | "finish">("finish");

  //搜索数据
  const getSearchData = async (name: string) => {
    if (keyword.value == name) {
      return;
    }

    keyword.value = name;
    searchData.value = [];

    state.value = "loading";

    searchData.value = await api.search(keyword.value.trim());

    state.value = "finish";
  };

  return {
    keyword,
    state,
    searchData,
    getSearchData,
  };
});
