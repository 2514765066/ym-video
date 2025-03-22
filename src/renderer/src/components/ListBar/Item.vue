<template>
  <RouterLink
    :to="to"
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
    :class="{ active: route.path.includes(to) }"
  >
    <Icon :name="icon" size="20" color="#989898" />
    <span class="text-sm text-ellipsis overflow-hidden whitespace-nowrap">
      {{ title }}
    </span>
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  to: string;
  icon: string;
}>();

const route = useRoute();
</script>

<style scoped lang="scss">
a {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
  }

  &:hover {
    background-color: #2c2c2c;
  }
}

.active {
  background-color: #2c2c2c;

  > span {
    color: rgba(#fff, 0.81);
  }
}
</style>
