<template>
  <form
    class="py-2 pl-2.5 pr-2 rounded-lg flex items-center gap-1"
    @submit.prevent="handleSubmit"
  >
    <Icon name="search" size="18" color="#ffffffcf"></Icon>
    <input
      type="text"
      :placeholder="placeholder"
      class="w-full h-full text-color"
      v-model="keyword"
    />
  </form>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/useMovieStore";
import { useSearchStore } from "@/stores/useSearchStore";

const { movieData } = storeToRefs(useMovieStore());
const { getSearchData } = useSearchStore();
const router = useRouter();

//关键词
const keyword = ref("");

//提示电影名称
const tipkeyword = computed(() => {
  const index = Math.floor(Math.random() * movieData.value.length);

  return movieData.value.length == 0 ? "" : movieData.value[index].name;
});

//搜索提示词
const placeholder = computed(() => {
  return `尝试搜索'${tipkeyword.value}''`;
});

//处理搜索
const handleSubmit = () => {
  if (!keyword.value && !tipkeyword.value) {
    return;
  }

  if (keyword.value) {
    getSearchData(keyword.value);
  } else {
    getSearchData(tipkeyword.value);
  }

  router.push("/search");

  keyword.value = "";
};
</script>

<style scoped lang="scss">
form {
  width: 296px;
  height: 36px;

  background-color: #202020;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 0px 1px;

  transition: 0.1s;

  > input {
    &::placeholder {
      color: #707070;
    }
  }

  &:focus-within {
    width: 400px;
    box-shadow: rgba(35, 131, 226, 0.35) 0px 0px 0px 2px;
  }
}
</style>
