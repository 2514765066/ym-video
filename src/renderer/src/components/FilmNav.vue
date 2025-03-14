<template>
  <RouterLink :to="to">
    <span
      class="text-3xl font-bold cursor-pointer"
      :class="{ active: route.path == to }"
    >
      {{ title }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
const route = useRoute();

defineProps<{
  title: string;
  to: string;
  hoverColor: string;
}>();
</script>

<style scoped lang="scss">
a {
  span {
    color: #373737;
    transition: color 0.1s;

    &:hover {
      color: v-bind("hoverColor");
    }
  }
}

.active {
  color: #e1e1e1;
}
</style>
