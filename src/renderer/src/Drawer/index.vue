<template>
  <el-drawer
    v-model="model"
    direction="btt"
    size="100%"
    class="Drawer"
    :with-header="false"
    :modal="false"
    :destroy-on-close="true"
    @close="emits('close')"
  >
    <slot></slot>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElDrawer } from "element-plus";

//显示隐藏
const model = defineModel<boolean>();

//事件
const emits = defineEmits(["close"]);
</script>

<style lang="scss"></style>
