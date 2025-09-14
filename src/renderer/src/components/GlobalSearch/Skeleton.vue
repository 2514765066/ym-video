<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <div class="flex h-16 p-2 gap-3">
        <el-skeleton-item
          variant="image"
          style="aspect-ratio: 1/1; height: 100%; border-radius: 4px"
        />

        <div class="flex flex-col gap-2 w-full justify-center">
          <el-skeleton-item variant="text" style="width: 60%" />
          <el-skeleton-item variant="text" style="width: 35%" />
        </div>
      </div>
    </template>

    <slot></slot>
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
