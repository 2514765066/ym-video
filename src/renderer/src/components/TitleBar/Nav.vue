<template>
  <section class="h-full flex items-center gap-1">
    <Tip content="返回">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center"
        :class="{ active: canGoBack }"
        @click="back"
      >
        <Icon
          name="arrow1"
          :color="canGoBack ? '#ffffffcf' : '#646464'"
          size="18"
        />
      </button>
    </Tip>

    <Tip content="前进">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center"
        :class="{ active: canGoForward }"
        @click="forward"
      >
        <Icon
          name="arrow1"
          :color="canGoForward ? '#ffffffcf' : '#646464'"
          size="18"
          style="transform: rotate(180deg)"
        />
      </button>
    </Tip>
  </section>
</template>

<script setup lang="ts">
import Tip from "@/components/Tooltip/Tip.vue";

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

<style scoped lang="scss">
button {
  cursor: default;
  transition: 0.1s;
}
</style>
