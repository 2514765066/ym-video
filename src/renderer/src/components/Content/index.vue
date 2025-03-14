<template>
  <main class="content pb-6">
    <div class="mx-auto w-4/5">
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.content {
  overflow-y: auto;

  > div {
    max-width: 1160px;
  }

  &::-webkit-scrollbar {
    width: 16px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #474747;
  }
}
</style>
