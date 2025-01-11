<template>
  <section class="title-bar w-100 v-n-c g-1">
    <Logo />

    <aside class="fs-12 p-a c-ccc v-c-c o-h px-1r">
      <span class="ellipsis">
        {{ selectedVideo?.name }}
      </span>
    </aside>

    <button @click="emits('close')" class="button2 ml">
      <img src="@/assets/svg/close.svg" width="16" />
    </button>
  </section>
</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

const emits = defineEmits(["close"]);
</script>

<style scoped lang="scss">
.title-bar {
  height: 38px;
  -webkit-app-region: drag;

  > aside {
    width: 600px;
    height: 26px;
    border: 1px solid #454545;
    border-radius: 0.5rem;
    background-color: #2a2a2a;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      background-color: #313131;
      border-color: #5b5b5b;
    }
  }
}
</style>
