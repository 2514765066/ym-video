<template>
  <form class="v-n-c" @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="搜索"
      class="fs-14 w-100"
      v-model="keyword"
    />
    <img src="@/assets/svg/search.svg" @click="handleSubmit" />
  </form>
</template>

<script setup lang="ts">
const router = useRouter();

const keyword = ref("");

const handleSubmit = () => {
  if (!keyword.value) {
    return;
  }

  router.push({
    path: "/search",
    query: {
      keyword: keyword.value,
    },
  });

  keyword.value = "";
};
</script>

<style scoped lang="scss">
form {
  height: 34px;
  padding: 0 10px;
  margin: 0 10px;
  background-color: #2d2d2d;
  border-radius: 5px;
  border: 1.5px solid #303030;
  border-bottom-color: #9a9a9a;
  transition: 0.1s;

  > input {
    &::placeholder {
      color: #cfcfcf;
    }
  }

  > img {
    width: 14px;
  }

  &:focus-within {
    background-color: #1d1d1d;
    border-color: #2c3037;
    border-bottom-color: #ff8232;
  }
}
</style>
