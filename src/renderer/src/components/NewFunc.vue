<template>
  <ElDialog v-model="showable" title="新增功能">
    <ol class="h g-2">
      <li v-for="(item, index) of data" :key="index" class="c-ccc">
        {{ item }}
      </li>
    </ol>
  </ElDialog>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { ElDialog } from "element-plus";

//是否显示
const showable = ref(false);

const data = ref([
  `新增："导航栏" 的 "新增功能" 现在可以在软件中查看`,
  `新增："设置页面" 显示软件更新进度`,
]);

eventEmitter.on("new:show", () => {
  showable.value = true;
});
</script>

<style scoped lang="scss">
ol {
  list-style-type: decimal;
  padding-left: 1rem;
}
</style>
