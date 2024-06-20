<template>
  <el-drawer v-model="visible" direction="ltr" title="设置" size="350px">
    <section class="h g-1r h-100">
      <div class="v-n-c g-1r">
        <span>3倍速播放：</span>
        <KeyStroke v-model="data.speed"></KeyStroke>
      </div>

      <div class="v-n-c g-1r">
        <span>前进5秒钟：</span>
        <KeyStroke v-model="data.forward"></KeyStroke>
      </div>

      <div class="v-n-c g-1r">
        <span>后退5秒钟：</span>
        <KeyStroke v-model="data.backward"></KeyStroke>
      </div>

      <aside class="mt c-ccc fs-14">v{{ version }}</aside>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import KeyStroke from "./KeyStroke.vue";
import { ElDrawer } from "element-plus";
import { useSetStore } from "@/stores/useSetStore";

const { data, version } = storeToRefs(useSetStore());

const visible = ref(false);

eventEmitter.on("set:show", () => {
  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
