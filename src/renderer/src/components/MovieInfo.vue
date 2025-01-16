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

        <img :src="src" class="wh-100" @load="handleLoad" />

        <div class="p-a w-100 p-2 v-sb-e">
          <p class="fs-14 ellipsis">{{ data.name }}</p>

          <img
            src="@/assets/svg/play.svg"
            width="40px"
            class="click"
            @click="handleClick"
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
import { useLoading } from "@/hooks/useLoading";

const videoStore = useVideoStore();
const colorThief = new ColorThief();
const getUrl = useLoading(api.getUrl);

const props = defineProps<{
  data: MovieInfo;
  remove?: boolean;
}>();

//图片的base64
const src = ref("");

//主要颜色
const mainColor = ref("");

//图片是否加载完成
const loading = ref(true);

//处理点击
const handleClick = async () => {
  //获取url
  const url = await getUrl(props.data.name);

  if (url.length == 0) {
    eventEmitter.emit("error:show", "暂时没有资源");
    return;
  }

  //不存在就添加
  if (!videoStore.has(props.data.name)) {
    videoStore.add({
      name: props.data.name,
      history: 0,
      minVersion: __APP_VERSION__,
      pic: props.data.pic,
    });
  }

  eventEmitter.emit("video:show", url);
};

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

//初始化获取图片
(async () => {
  src.value = await api.getImg(props.data.pic);

  loading.value = false;
})();
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
      display: none;

      filter: drop-shadow(0 1px 1px rgba(#000, 0.5));
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
        display: block;
      }
    }
  }
}
</style>
