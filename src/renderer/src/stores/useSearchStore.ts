import { SearchInfo } from "@type";

export const useSearchStore = defineStore("search", () => {
  //关键词
  const keyword = ref("");

  //电影数据
  const searchData = ref<SearchInfo[]>([]);

  //搜索数据
  const getSearchData = async (name: string) => {
    if (keyword.value == name) {
      return;
    }

    keyword.value = name;

    searchData.value = await api.search(keyword.value.trim());
  };

  return {
    keyword,
    searchData,
    getSearchData,
  };
});
