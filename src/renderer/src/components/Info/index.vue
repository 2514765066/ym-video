<template>
  <el-skeleton style="width: 170px; height: 240px" :loading="loading" animated>
    <template #template>
      <el-skeleton-item
        variant="image"
        style="width: 170px; height: 240px; border-radius: 0.5rem"
      />
    </template>

    <template #default>
      <li class="h p-r o-h">
        <el-popover
          trigger="click"
          width="auto"
          popper-style="min-width:0px;"
          :hide-after="0"
          v-if="remove"
        >
          <template #reference>
            <section class="p-a v-c-c click more">
              <img src="@/assets/svg/more.svg" width="20px" />
            </section>
          </template>
          <button @click="handleRemove">删除</button>
        </el-popover>

        <img :src="src ? src : data.pic" class="wh-100" @load="handleLoad" />

        <div class="p-a w-100 p-2 v-sb-e">
          <p class="fs-14 ellipsis">{{ data.name }}</p>

          <img
            src="@/assets/svg/play.svg"
            width="40px"
            class="click"
            @click="emits('play')"
          />
        </div>
      </li>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem, ElPopover } from "element-plus";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import ColorThief from "colorthief";

const videoStore = useVideoStore();
const colorThief = new ColorThief();

const props = withDefaults(
  defineProps<{
    data: MovieInfo;
    src?: string;
    loading?: boolean;
    remove?: boolean;
  }>(),
  {
    loading: false,
    remove: false,
  }
);

const emits = defineEmits(["play"]);

//主要颜色
const mainColor = ref("");

//处理移除
const handleRemove = () => {
  videoStore.remove(props.data.name);
  eventEmitter.emit("success:show", "移除成功");
};

//处理load获取颜色
const handleLoad = async ({ target }) => {
  const color = await colorThief.getColor(target);

  mainColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};
</script>

<style scoped lang="scss">
li {
  width: 170px;
  height: 240px;

  border-radius: 0.5rem;
  box-shadow: 0 1px 5px 2px rgba(#000, 0.1);

  .more {
    $size: 25px;
    width: $size;
    height: $size;

    top: 10px;
    right: 10px;

    opacity: 0;
    backdrop-filter: blur(20px);
    border-radius: 50%;
    background-color: rgba(#fff, 0.2);
    transition: 0.1s opacity;
  }

  > div:last-child {
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: v-bind("mainColor");

    transition: 0.1s box-shadow;

    > p {
      text-shadow: 0.5px 0.5px 3px #000;
    }

    > img {
      opacity: 0;

      filter: drop-shadow(0 1px 1px rgba(#000, 0.5));

      transition: 0.1s opacity;
    }
  }

  &:hover {
    > section {
      opacity: 1;
    }

    > div:last-child {
      box-shadow: 0 -1px 50px 50px v-bind("mainColor");

      > p {
        white-space: wrap;
      }

      > img {
        opacity: 1;
      }
    }
  }
}
</style>
