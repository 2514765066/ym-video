<template>
  <RouterLink :to="to" class="v-n-c pl-2 g-1r p-r" v-if="to">
    <slot></slot>
    <span class="fs-14" v-if="title">{{ title }}</span>
  </RouterLink>

  <li class="v-n-c pl-2 g-1r p-r" v-else>
    <slot></slot>
    <span class="fs-14">{{ title }}</span>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  to?: string;
}>();
</script>

<style scoped lang="scss">
a,
li {
  height: 34px;
  transition: 0.1s;
  border-radius: 5px;
  color: #fff;
  cursor: default;

  > :deep(img) {
    width: 20px;
  }

  &:hover {
    background-color: #2d2d2d;
  }

  &::before {
    content: "";
    width: 3.5px;
    height: 45%;
    display: block;
    position: absolute;
    left: 0;
    border-radius: 3.5px;
    transition: 0.1s;
  }
}
</style>
