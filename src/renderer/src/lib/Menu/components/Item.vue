<template>
  <section
    class="menu-item flex items-center rounded-md pr-3 cursor-pointer pl-2 gap-1"
  >
    <div class="flex justify-center items-center mr-1.5" v-if="data.icon">
      <Icon :name="data.icon" size="18" color="#ffffffcf"></Icon>
    </div>

    <span class="text-sm text-color mr-auto" v-if="data.title">
      {{ data.title }}
    </span>

    <span v-if="data.sub" class="text-xs text-color-darken">
      {{ data.sub }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { MenuItem } from "../type";

defineProps<{
  data: MenuItem;
}>();
</script>

<style scoped lang="scss">
.menu-item {
  height: 32px;

  transition: 0.1s;

  &:hover {
    background-color: #313131;
  }
}
</style>
