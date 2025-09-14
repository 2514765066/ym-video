<template>
  <ElTooltip
    virtual-triggering
    placement="top"
    v-model:visible="visible"
    :virtual-ref="triggerRef"
    :hide-after="0"
    :append-to="playerRef"
    :show-arrow="false"
    v-bind="$attrs"
    popper-class="tooltip-tip"
  />
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { playerRef } from "../hooks/useEl";

const props = defineProps<{
  offset: number[];
}>();

const visible = defineModel({
  default: false,
});

const triggerRef = ref({
  getBoundingClientRect() {
    return position.value;
  },
});

const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
});

watch(
  () => props.offset,
  () => {
    position.value = DOMRect.fromRect({
      x: props.offset[0],
      y: props.offset[1],
    });
  }
);
</script>

<style scoped lang="scss"></style>
