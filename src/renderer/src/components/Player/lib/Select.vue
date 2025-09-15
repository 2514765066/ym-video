<template>
  <ElTooltip
    effect="light"
    trigger="click"
    placement="top"
    :offset="6"
    :hide-after="0"
    :append-to="playerRef"
    :show-arrow="false"
    popper-class="playrate-menu"
    v-bind="$attrs"
  >
    <slot></slot>

    <template #content>
      <section class="w-32 p-1 rounded-md flex flex-col gap-1">
        <button
          class="w-full h-8 flex-center rounded-md text-main text-base"
          :class="{ active: value == model }"
          v-for="{ label, value } of data"
          :key="value"
          @click="handleSelect(value)"
        >
          {{ label }}
        </button>
      </section>
    </template>
  </ElTooltip>
</template>

<script setup lang="ts">
import { playerRef } from "../hooks/useEl";

import { ElTooltip } from "element-plus";

defineProps<{
  data: {
    label: string | number;
    value: any;
  }[];
}>();

const model = defineModel<any>();

const handleSelect = item => {
  model.value = item;
};
</script>

<style scoped lang="scss">
section {
  background-color: #252525;

  box-shadow: rgba(0, 0, 0, 0.48) 0px 24px 48px -8px,
    rgba(0, 0, 0, 0.24) 0px 4px 12px -1px;

  > button {
    transition: 0.1s;

    &:hover {
      color: #222;
      background-color: rgba(#fff, 0.81);
    }
  }

  .active {
    color: #222;
    background-color: rgba(#fff, 0.81);

    transform: scale(1.1);
  }
}
</style>
