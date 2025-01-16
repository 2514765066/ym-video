<template>
  <section class="row v-n-c f-s-0">
    <slot name="icon"></slot>

    <div class="mr h-n-c g-1 f-1" :class="{ 'ml-1r': $slots.icon }">
      <span class="c-fff fs-14 l-h-14">{{ label }}</span>

      <slot name="des">
        <span class="c-ccc fs-12 l-h-12" v-if="des">{{ des }}</span>
      </slot>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
import { formatUnit } from "../../hooks/useCss";

withDefaults(
  defineProps<{
    label?: string;
    des?: string;
    height?: string | number;
  }>(),
  {
    height: 65,
  }
);
</script>

<style scoped lang="scss">
.row {
  height: v-bind("formatUnit(height)");
  padding: 0 1rem;
  background-color: #323232;
  border: 1.5px solid #232323;
  border-radius: 5px;
  transition: 0.1s;
}
</style>
