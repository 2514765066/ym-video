<template>
  <section class="pl-2.5 pr-2 rounded-lg flex items-center gap-1">
    <input
      type="text"
      :placeholder="placeholder"
      class="w-full h-full text-color text-sm"
      spellcheck="false"
      v-model="text"
      :required="required"
      ref="inputRef"
    />
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    placeholder?: string;
    required?: boolean;
  }>(),
  {
    width: "100%",
    height: "32px",
  }
);

//关键词
const text = defineModel<string>();

const inputRef = ref<HTMLInputElement>();

defineExpose({
  inputRef,
});
</script>

<style scoped lang="scss">
section {
  width: v-bind("width");
  height: v-bind("height");

  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #202020;
  transition: 0.1s;

  > input {
    &::placeholder {
      color: #707070;
    }
  }

  &:focus-within {
    border: 1px solid #22588f;
    box-shadow: 0px 0px 0px 2px rgba(35, 131, 226, 0.35);
  }
}
</style>
