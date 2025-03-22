<template>
  <Content>
    <header class="flex justify-center items-center w-full pt-6">
      <strong class="text-3xl text-color">{{ name }}的版本更新内容</strong>
    </header>

    <div v-for="{ name, data } of docData" :key="name" class="mb-8">
      <h2 class="text-color text-xl pb-1 mb-4">{{ name }}</h2>

      <ul v-for="item of data" class="flex flex-col">
        <li class="text-color">{{ item }}</li>
      </ul>
    </div>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/components/Content/index.vue";
import { useDocStore } from "@/stores/useDocStore";
import { useAppStore } from "@/stores/useAppStore";

const { docData } = storeToRefs(useDocStore());
const { name } = useAppStore();
</script>

<style scoped lang="scss">
header {
  height: 100px;
}

div {
  > h2 {
    border-bottom: 1px solid #3a3a3a;
  }
  > ul {
    > li {
      height: 30px;
    }
  }
}
</style>
