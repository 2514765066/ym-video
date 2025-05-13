<template>
  <ElScrollbar ref="scrollbarRef" @scroll="emits('scroll', wrapRef)">
    <div class="content mx-auto w-4/5 flex flex-col">
      <slot></slot>
    </div>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";

defineProps<{
  paddingBottom?: string | number;
}>();

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
let wrapRef: HTMLDivElement | undefined;

const emits = defineEmits<{
  scroll: [el: HTMLDivElement | undefined];
}>();

onMounted(() => {
  if (!scrollbarRef.value) {
    return;
  }

  wrapRef = scrollbarRef.value.wrapRef;
});
</script>

<style scoped lang="scss">
.content {
  min-height: 100%;
  padding-bottom: calc(v-bind("paddingBottom") * 1px);
  max-width: 1160px;
}
</style>
