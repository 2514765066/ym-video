<template>
  <section class="p-2 flex justify-center items-center gap-2">
    <Tip content="上一页">
      <button
        class="w-6 h-6 flex justify-center items-center rounded hover:bg-stone-800"
        @click="handlePre"
      >
        <Icon name="arrow1" size="20" color="#ffffffcf" />
      </button>
    </Tip>

    <input
      class="w-full h-6 px-2 rounded text-sm text-color text-center"
      type="number"
      v-model.number="currentPage"
    />

    <Tip content="下一页">
      <button
        class="w-6 h-6 flex justify-center items-center rounded hover:bg-stone-800"
        @click="handleNext"
      >
        <Icon name="arrow1" size="20" color="#ffffffcf" class="rotate-180" />
      </button>
    </Tip>
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip } from "@/components/Tooltip";

const props = withDefaults(
  defineProps<{
    totle: number;
    pageSize: number;
  }>(),
  {
    pageSize: 20,
  }
);

//当前页数
const currentPage = defineModel<number>({
  default: 1,
  set(value) {
    if (value > pageCount.value) return pageCount.value;
    if (value < 1) return 1;
    return value;
  },
});

//分页数量
const pageCount = computed(() => {
  return Math.ceil(props.totle / props.pageSize) || 1;
});

//上一页
const handlePre = () => {
  if (currentPage.value == 1) {
    return;
  }

  currentPage.value--;
};

//下一页
const handleNext = () => {
  if (currentPage.value == pageCount.value) {
    return;
  }

  currentPage.value++;
};
</script>

<style scoped lang="scss">
section {
  > input {
    box-shadow: rgb(48, 48, 46) 0px 0px 0px 1px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  > button {
    &:hover {
      background-color: #272727;
    }
  }
}
</style>
