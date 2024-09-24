<template>
  <el-tooltip :content="version" :hide-after="0">
    <section class="Logo v-n-c">
      <img src="@/assets/icon.png" width="20px" />

      <span class="c-ccc ml-2 fs-18">ym-video</span>
    </section>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { useConfigStore } from "@/stores/useConfigStore";

const { version } = storeToRefs(useConfigStore());
</script>

<style scoped lang="scss">
.Logo {
  > span {
    font-family: logo;
  }

  > button {
    $size: 30px;

    width: $size;
    height: $size;
    border-radius: 0.5rem;
    transition: 0.15s;

    > img {
      $size: 15px;

      width: $size;
      height: $size;
    }

    &:hover {
      background-color: #373737;
    }
  }
}
</style>
