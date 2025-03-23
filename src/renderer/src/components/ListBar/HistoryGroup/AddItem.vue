<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
    @click="handleClick"
  >
    <Icon name="add" size="16" color="#989898" />

    <span class="mr-auto">探索视频</span>
  </section>
</template>

<script setup lang="ts">
const router = useRouter();

const handleClick = () => {
  router.push("/film");
};
</script>

<style scoped lang="scss">
section {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
    font-size: 13px;
  }

  &:hover {
    background-color: #2c2c2c;
  }
}
</style>
