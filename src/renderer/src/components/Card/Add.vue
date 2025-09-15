<template>
  <li
    class="flex-center flex-col gap-2 rounded-lg cursor-pointer"
    @click="handleClick"
  >
    <Icon name="add" size="40" color="#74716C" />
    <span class="text-sm text-main-darken">发现影视</span>
  </li>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";

const router = useRouter();

const handleClick = () => {
  router.push("/film");
};
</script>

<style scoped lang="scss">
li {
  min-width: 160px;
  max-width: 185px;
  width: 100%;
  aspect-ratio: 2/3;

  box-shadow: 0 1px 5px 2px rgba(#000, 0.2);

  background-color: #1f1f1f;
}
</style>
