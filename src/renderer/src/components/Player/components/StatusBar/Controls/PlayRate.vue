<template>
  <Select :data="playrateList" v-model="playrate">
    <button>
      <Tip content="倍速" :append-to="playerRef">
        <Icon name="playrate" size="22" color="#ffffff99" />
      </Tip>
    </button>
  </Select>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { playerRef } from "@player/hooks/useEl";
import { Tip } from "@/components/Tooltip";
import Select from "@player/lib/Select.vue";
import { playrate } from "@player/hooks/usePlayrate";

const playrateList = [
  {
    label: "4.0x",
    value: "4.0",
  },
  {
    label: "3.0x",
    value: "3.0",
  },
  {
    label: "2.0x",
    value: "2.0",
  },
  {
    label: "1.5x",
    value: "1.5",
  },
  {
    label: "1.25x",
    value: "1.25",
  },
  {
    label: "1.0x",
    value: "1.0",
  },
  {
    label: "0.75x",
    value: "0.75",
  },
  {
    label: "0.5x",
    value: "0.5",
  },
  {
    label: "0.25x",
    value: "0.25",
  },
];
</script>

<style scoped lang="scss"></style>
