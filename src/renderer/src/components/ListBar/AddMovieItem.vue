<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
    @click="clickHandler"
  >
    <Icon name="add" size="16" color="#989898" />

    <span class="text-sm text-ellipsis overflow-hidden"> 添加视频 </span>
  </section>
</template>

<script setup lang="ts">
const router = useRouter();

//点击元素
const clickHandler = () => {
  router.push("/film");
};
</script>

<style scoped lang="scss">
section {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
  }

  > button {
    transition: 0.1s;

    &:hover {
      background-color: #383838;
    }
  }

  &:hover {
    background-color: #2c2c2c;

    > button {
      opacity: 1;
    }
  }
}

.active {
  background-color: #2c2c2c;

  > span {
    color: rgba(#fff, 0.81);
  }
}
</style>
