<template>
  <section class="menu-group flex flex-col p-1">
    <div class="px-3.5 flex items-center" v-if="title">
      <span class="text-xs">{{ title }}</span>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped lang="scss">
.menu-group {
  > div:first-child {
    height: 32px;

    > span {
      color: rgba(#fff, 0.443);
    }
  }
}

.menu-group:not(:last-child) {
  border-bottom: 1px solid #3a3a3a;
}
</style>
