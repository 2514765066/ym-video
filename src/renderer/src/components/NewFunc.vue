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
import Doc from "@/assets/release-note.md?raw";
import eventEmitter from "@/hooks/eventEmitter";
import { ElDialog } from "element-plus";

//是否显示
const showable = ref(false);

const data = ref(Doc.match(/^\d+\..+/gm));

eventEmitter.on("new:show", () => {
  showable.value = true;
});
</script>

<style scoped lang="scss"></style>
