<template>
  <section class="ym-slider" ref="slider">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="model"
      @click.stop
    />

    <aside></aside>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { formatUnit } from "@/hooks/useCss";

const props = withDefaults(
  defineProps<{
    width?: number;
    min?: number;
    max?: number;
    step?: number | string;
  }>(),
  {
    width: 300,
    min: 0,
    max: 100,
    step: 1,
  }
);

const model = defineModel<number>({
  default: 0,
});

const track = computed(
  () => ((model.value - props.min) / (props.max - props.min)) * props.width
);
</script>

<style scoped lang="scss">
.ym-slider {
  --main-color: #ff8232;
  width: v-bind("formatUnit(width)");
  height: 6px;
  position: relative;
  display: flex;
  align-items: center;
  $sliderHeight: 4px;
  $radius: 3px;

  > input {
    width: 100%;
    height: $sliderHeight;
    border-radius: $radius;
    appearance: none;
    background-color: #9f9f9f;

    &::-webkit-slider-thumb {
      z-index: 1;
      appearance: none;
      position: relative;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--main-color);
      box-shadow: 0 0 0 5px #454545;
      transition: 0.1s;

      &:hover {
        transform: scale(1.3);

        box-shadow: 0 0 0 3px #454545;
      }
    }
  }

  > aside {
    border-radius: $radius;
    width: v-bind("track +'px'");
    height: $sliderHeight;
    left: 0;
    position: absolute;
    background-color: var(--main-color);
  }
}
</style>
