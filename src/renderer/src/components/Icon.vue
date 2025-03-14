<template>
  <i :style="{ 'mask-image': `url(${maskUrl})` }" class="shrink-0 block"></i>
</template>

<script setup lang="ts">
const props = defineProps<{
  size: string;
  color?: string;
  name: string;
}>();

const maskUrl = ref(
  new URL(`../assets/svg/${props.name}.svg`, import.meta.url)
);
</script>

<style scoped lang="scss">
i {
  width: calc(v-bind("size") * 1px);
  height: calc(v-bind("size") * 1px);

  background-color: v-bind("color");
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>
