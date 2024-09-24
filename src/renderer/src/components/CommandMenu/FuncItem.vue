<template>
  <li class="v-sb-c g-1" @click="handleClick">
    <div class="h-n-c o-h">
      <span class="c-ccc ellipsis">{{ data.name }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: {
    name: string;
    onClick: Function;
  };
}>();

const emit = defineEmits(["close"]);

//处理点击
const handleClick = () => {
  if (props.data.onClick) {
    props.data.onClick();
  }

  emit("close");
};
</script>

<style scoped lang="scss"></style>
