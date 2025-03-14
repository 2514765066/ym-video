<template>
  <section class="h-12 flex items-center gap-2 group flex-shrink-0">
    <Icon :name="icon" size="16" color="#989898" v-if="icon"></Icon>

    <span class="text-xs">{{ title }}</span>

    <slot name="after"></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  icon?: string;
}>();
</script>

<style scoped lang="scss">
.group {
  > span {
    color: #7f7f7f;
  }
}
</style>
