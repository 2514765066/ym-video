<template>
  <Tip content="返回">
    <button
      class="w-6 h-6 rounded-md flex items-center justify-center hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none"
      :disabled="!canGoBack"
      @click="back"
    >
      <Icon name="arrow" color="#ffffffcf" size="18" />
    </button>
  </Tip>

  <Tip content="前进">
    <button
      class="w-6 h-6 rounded-md flex items-center justify-center hover:bg-stone-800 disabled:opacity-40 disabled:pointer-events-none"
      :disabled="!canGoBack"
      @click="forward"
    >
      <Icon
        name="arrow"
        color="#ffffffcf"
        size="18"
        style="transform: rotate(180deg)"
      />
    </button>
  </Tip>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip } from "@/components/Tooltip";

const router = useRouter();

const canGoBack = ref(false);
const canGoForward = ref(false);

router.afterEach(() => {
  canGoBack.value = history.length > 1 && history.state.position != 0;

  canGoForward.value =
    history.state && history.state.position < history.length - 1;
});

const back = () => {
  router.back();
};

const forward = () => {
  router.forward();
};
</script>

<style scoped lang="scss"></style>
