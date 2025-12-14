<template>
  <Item label="项目地址" icon="globe" sub="应用的开源地址">
    <Button @click="handleClick">查看</Button>
  </Item>
</template>

<script setup lang="ts">
import Button from "@/components/ui/button.vue";
import { useConfigStore } from "@manager/stores/useConfigStore";
import Item from "@manager/views/setting/setting-item.vue";

const { config } = storeToRefs(useConfigStore());

const handleClick = () => {
  api.openUrl(config.value.selectedRepo.url);
};
</script>

<style scoped lang="scss"></style>
