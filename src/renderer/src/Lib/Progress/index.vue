<template>
  <section class="ym-progress">
    <div
      class="ym-progress-bar"
      :class="{ 'ym-progress-bar-indeterminate': indeterminate }"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { formatUnit } from "../../hooks/useCss";

withDefaults(
  defineProps<{
    width?: string | number;
    height?: string | number;
    percentage?: number;
    indeterminate?: boolean;
    bg?: string;
  }>(),
  {
    width: "100%",
    height: 6,
    percentage: 0,
    transparent: false,
    indeterminate: false,
    bg: "#4d4d4d",
  }
);
</script>

<style scoped lang="scss">
.ym-progress {
  $height: v-bind("formatUnit(height)");
  width: v-bind("formatUnit(width)");
  height: $height;
  border-radius: calc($height / 2);
  background-color: v-bind("bg");
  overflow: hidden;

  .ym-progress-bar {
    width: v-bind("percentage +'%'");
    height: 100%;
    border-radius: inherit;
    transition: 0.1s;
    background-color: var(--main-color);
  }

  .ym-progress-bar-indeterminate {
    width: 100%;
    animation: indeterminate 1s infinite ease;
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }
}
</style>
