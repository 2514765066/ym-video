<template>
  <Content>
    <TimeGreet class="mb-6"></TimeGreet>

    <HistoryContent />

    <UpdateContent />
  </Content>
</template>

<script setup lang="ts">
import UpdateContent from "./UpdateContent.vue";
import HistoryContent from "./HistoryContent.vue";
import Content from "@/components/Content/index.vue";
import TimeGreet from "./TimeGreet.vue";
</script>

<style scoped lang="scss"></style>
