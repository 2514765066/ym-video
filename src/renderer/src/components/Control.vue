<template>
  <section class="Control v-n-c h-100">
    <div class="h-100 v-c-c click" @click="minimize">
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
import { useControl } from "@/hooks/useControl";

const { close, maximize, minimize, isFullScreen } = useControl();
</script>

<style scoped lang="scss">
.Control {
  > div {
    width: 2.8rem;
    border-radius: 0.5rem;
    transition: 0.15s;

    > img {
      width: 14px;
      height: 14px;
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
