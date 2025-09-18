<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <el-skeleton-item
        variant="rect"
        style="width: 100%; height: 300px; border-radius: 1rem"
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
