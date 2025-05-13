<template>
  <ElTooltip
    :content="content"
    effect="light"
    :hide-after="0"
    :show-arrow="false"
    :offset="6"
    v-bind="$attrs"
    popper-class="tooltip-tip"
  >
    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

defineProps<{
  content: string;
}>();
</script>

<style lang="scss">
.tooltip-tip {
  --el-bg-color-overlay: #2f2f2f !important;
  --el-border-color-light: transparent !important;
  padding: 2px 8px !important;

  box-shadow: 0 0 4px 2px rgba(#000, 0.1);
}
</style>
