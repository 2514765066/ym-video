<template>
  <i
    :style="{ 'mask-image': `url(${maskUrl})` }"
    class="shrink-0 block transition-all"
  ></i>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: string | number;
    color?: string;
    name: string;
  }>(),
  {
    size: 16,
    color: "#fff",
  }
);

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
