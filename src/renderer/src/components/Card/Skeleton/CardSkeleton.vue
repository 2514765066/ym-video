<template>
  <el-skeleton
    style="aspect-ratio: 2/3; min-width: 160px; max-width: 185px; width: 100%"
    :loading="loading"
    animated
  >
    <template #template>
      <el-skeleton-item
        variant="image"
        style="width: 100%; height: 100%; border-radius: 0.5rem"
      />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";

withDefaults(
  defineProps<{
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);
</script>

<style scoped lang="scss"></style>
