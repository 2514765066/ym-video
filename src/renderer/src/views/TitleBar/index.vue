<template>
  <section class="v-n-c">
    <img src="@/assets/icon.png" width="20" />

    <button
      class="fs-12 p-a c-ccc"
      @click="eventEmitter.emit('select:video:show')"
    >
      {{ list.selectedName || "未选择视频" }}
    </button>

    <div class="h-100 v-c-c click ml" @click="minimize">
      <img src="@/assets/minimize.svg" />
    </div>

    <div class="v-c-c click h-100" @click="maximize">
      <img src="@/assets/restore.svg" v-if="ismax" />
      <img src="@/assets/maximize.svg" v-else />
    </div>

    <div class="h-100 v-c-c click" @click="close">
      <img src="@/assets/close.svg" />
    </div>
  </section>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { useListStore } from "@/stores/useListStore";

const list = useListStore();

const ismax = ref(false);

function close() {
  api.close();
}

function maximize() {
  api.maximize();
}

function minimize() {
  api.minimize();
}

electron.ipcRenderer.on("is:maximize", (_, res: boolean) => {
  ismax.value = res;
});
</script>

<style scoped lang="scss">
section {
  height: 38px;
  -webkit-app-region: drag;

  * {
    -webkit-app-region: no-drag;
  }

  > img {
    margin-left: 0.5rem;
  }

  > button {
    width: 600px;
    height: 26px;
    border: 1px solid #454545;
    border-radius: 0.5rem;
    background-color: #2a2a2a;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    transition: 0.15s;

    &:hover {
      background-color: #313131;
      border-color: #5b5b5b;
    }
  }

  > div {
    width: 2.8rem;
    border-radius: 0.3rem;
    transition: 0.15s;

    &:hover {
      background-color: #373737;
    }

    > img {
      width: 14px;
      height: 14px;
    }
  }

  > div:last-child {
    &:hover {
      background-color: #c42b1c;
    }
  }
}
</style>
