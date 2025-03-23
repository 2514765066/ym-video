<template>
  <section class="list-bar flex flex-col items-center gap-1 p-2">
    <Logo />

    <Item title="主页" to="/home" icon="home" />

    <Item title="影视" to="/film" icon="film" class="mb-2" />

    <HistoryGroup />

    <Bottom />
  </section>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
import Item from "./Item.vue";
import HistoryGroup from "./HistoryGroup/index.vue";
import Bottom from "./Bottom/index.vue";
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;

  border: 1.5px solid #2b2b2b;
  background-color: #202020;
}
</style>
