<template>
  <ElDialog v-model="showable" title="新增功能" width="60%">
    <ElScrollbar :height="400" class="ml-1r">
      <div v-for="{ name, data } of updatesInfo" :key="name" class="mb-2r">
        <p class="mb-2 fs-18">{{ name }}</p>

        <ol class="h g-2">
          <li v-for="(item, index) of data" :key="index" class="c-ccc fs-16">
            {{ item }}
          </li>
        </ol>
      </div>
    </ElScrollbar>
  </ElDialog>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { ElDialog, ElScrollbar } from "element-plus";
import { formatDoc } from "@/utils/formatDoc";

//是否显示
const showable = ref(false);

const updatesInfo = ref(formatDoc());

eventEmitter.on("new:show", () => {
  showable.value = true;
});
</script>

<style scoped lang="scss"></style>
