<template>
  <el-progress
    :percentage="percentage"
    style="width: 300px; margin-top: 1rem"
  />
</template>

<script setup lang="ts">
import { ElProgress } from "element-plus";

const percentage = ref(0);

electron.ipcRenderer.on("download-progress", (_, percent: number) => {
  percentage.value = Math.floor(percent);
});
</script>

<style scoped lang="scss"></style>
