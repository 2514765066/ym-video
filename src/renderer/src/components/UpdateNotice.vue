<template>
  <section class="h mt-1r">
    <span v-if="isSelect">正在拉取更新，如果时间较长或错误请手动更新</span>

    <div class="v">
      <el-button text bg @click="handleAuto" v-if="!isSelect"
        >自动更新</el-button
      >
      <el-button text bg @click="handleManual" :class="{ ml: isSelect }"
        >手动更新</el-button
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";

const isSelect = ref(false);

const handleAuto = () => {
  electron.ipcRenderer.send("autoUpdate");
  isSelect.value = true;
};

const handleManual = () => {
  electron.ipcRenderer.send("manualUpdate");
};
</script>

<style scoped lang="scss">
section {
  > span {
    white-space: wrap;
  }

  > div {
    width: 265px;
  }
}
</style>
