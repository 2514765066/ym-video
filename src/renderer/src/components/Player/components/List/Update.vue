<template>
  <Tip content="更新集数" placement="left">
    <button
      class="w-6 h-6 rounded-md flex-center hover:bg-stone-800"
      @click="handleUpdate"
    >
      <Icon name="update" color="#ffffffcf" size="18" />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip } from "@/components/Tooltip";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { openLoading, closeLoading } from "@/components/Loading";

const { update } = useVideoStore();
const { selectedName } = storeToRefs(useVideoStore());

const handleUpdate = async () => {
  openLoading("更新中...");

  try {
    await update(selectedName.value);
    eventEmitter.emit("success:show", "更新成功");
  } catch {
    eventEmitter.emit("error:show", "更新失败,请稍后再试");
  }

  closeLoading();
};
</script>

<style scoped lang="scss"></style>
