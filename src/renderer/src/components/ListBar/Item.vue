<template>
  <Tip :content="data.title" placement="right">
    <RouterLink
      class="w-10 h-10 flex-center rounded-xl cursor-pointer border border-transparent transition-all"
      :class="{ active: route.path.includes(data.to) }"
      :to="data.to"
    >
      <Icon :name="data.icon" size="24" color="#ffffffcf" />
    </RouterLink>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip } from "@/components/Tooltip";

defineProps<{
  data: {
    title: string;
    icon: string;
    to: string;
  };
}>();

const route = useRoute();
</script>

<style scoped lang="scss">
a {
  &:hover {
    background-color: rgba(#fff, 0.81);

    i {
      background-color: #202020;
    }
  }
}

.active {
  background-color: rgba(#fff, 0.81);

  i {
    background-color: #202020;
  }
}
</style>
