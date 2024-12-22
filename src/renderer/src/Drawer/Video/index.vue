<template>
  <Drawer v-model="showable">
    <main class="wh-100 h">
      <TitleBar @close="handleClose" />

      <div class="v">
        <section class="o-h w-100">
          <WebView />
        </section>

        <Selection />
      </div>
    </main>
  </Drawer>
</template>

<script setup lang="ts">
import WebView from "./WebView.vue";
import Selection from "./Selection.vue";
import Drawer from "../index.vue";
import TitleBar from "./TitleBar.vue";
import eventEmitter from "@/hooks/eventEmitter";

//是否可见
const showable = ref(false);

//关闭Drawer
const handleClose = () => {
  showable.value = false;
};

//事件触发
eventEmitter.on("video:show", () => {
  showable.value = true;
});
</script>

<style scoped lang="scss">
main {
  padding: 0 0.5rem 0.5rem;
  background-color: #1f1f1f;

  > div {
    height: calc(100% - 38px);
    gap: 0.5rem;

    > *:first-child {
      border-radius: 0.5rem;
      background-color: #131313;
      border: 1px solid #363b3f;
    }
  }
}
</style>
