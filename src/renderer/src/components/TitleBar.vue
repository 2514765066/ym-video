<template>
  <section class="title-bar v-n-c">
    <div class="h-100 v-c-c click ml" @click="minimize">
      <img src="@/assets/svg/minimize.svg" />
    </div>

    <div class="h-100 v-c-c click" @click="maximize">
      <img src="@/assets/svg/restore.svg" v-if="isFullScreen" />
      <img src="@/assets/svg/maximize.svg" v-else />
    </div>

    <div class="h-100 v-c-c click" @click="close">
      <img src="@/assets/svg/close.svg" />
    </div>
  </section>
</template>

<script setup lang="ts">
const isFullScreen = ref(false);

const close = () => {
  api.close();
};

const maximize = () => {
  api.maximize();
};

const minimize = () => {
  api.minimize();
};

electron.ipcRenderer.on("is:maximize", (_, res: boolean) => {
  isFullScreen.value = res;
});
</script>

<style scoped lang="scss">
.title-bar {
  height: 38px;
  padding-left: 0.5rem;
  -webkit-app-region: drag;

  > div {
    width: 42px;
    height: 100%;
    border-radius: 5px;
    transition: 0.15s;

    > img {
      width: 12px;
      height: 12px;
    }

    &:hover {
      background-color: #373737;
    }
  }

  > div:last-child {
    &:hover {
      background-color: #c42b1c;
    }
  }
}
</style>
