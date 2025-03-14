<template>
  <ElTooltip
    effect="light"
    :content="content"
    :hide-after="0"
    :show-arrow="false"
    :offset="6"
    v-bind="$attrs"
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

<style lang="scss"></style>
