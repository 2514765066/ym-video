<template>
  <section class="p-a fs-12 c-ccc o-h px-1r v-c-c">
    <span class="ellipsis">{{ url }}</span>
  </section>
</template>

<script setup lang="ts">
import { useVideoSiteStore } from "@/stores/useVideoSiteStore";

const { selectedVideoSite } = storeToRefs(useVideoSiteStore());

const url = computed(() => {
  return selectedVideoSite.value.history.last();
});
</script>

<style scoped lang="scss">
section {
  width: 600px;
  height: 26px;
  border: 1px solid #454545;
  border-radius: 13px;
  background-color: #202020;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
