<template>
  <el-drawer
    v-model="model"
    direction="btt"
    size="100%"
    class="Drawer"
    :show-close="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="wh-100 v-c-c">
      <slot></slot>
    </div>

    <template #header="{ close }">
      <slot name="header" :close="close"></slot>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElDrawer } from "element-plus";

const model = defineModel<boolean>();

const emits = defineEmits(["open", "close"]);

//处理打开抽屉
const handleOpen = () => {
  emits("open");
};

//处理关闭
const handleClose = () => {
  emits("close");
};
</script>

<style scoped lang="scss"></style>
