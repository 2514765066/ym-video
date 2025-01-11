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
import { ElSkeleton, ElSkeletonItem } from "element-plus";
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
  if (videoStore.has(props.data.id)) {
    const url = await getUrl(videoStore.selectedVideo!.name);

    //需要更新
    if (url.length > videoStore.selectedVideo!.url.length) {
      videoStore.selectedVideo!.url = url;
    }

    eventEmitter.emit("video:show");
    return;
  }

  //获取url
  const url = props.data.url ? props.data.url : await getUrl(props.data.name);

  if (url.length == 0) {
    eventEmitter.emit("error:show", "暂时没有资源");
    return;
  }

  //添加数据
  videoStore.add({
    name: props.data.name,
    id: props.data.id,
    url,
    history: 0,
    minVersion: __APP_VERSION__,
    pic: src.value,
  });

  eventEmitter.emit("video:show");
};

//处理移除
// const handleRemove = () => {
//   videoStore.remove(props.data.id);
//   eventEmitter.emit("success:show", "移除成功");
// };

//处理load
const handleLoad = async ({ target }) => {
  const color = await colorThief.getColor(target);

  mainColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
};

//初始化获取图片
(async () => {
  if (props.data.pic.includes("data:image/jpeg;base64")) {
    src.value = props.data.pic;

    loading.value = false;
    return;
  }

  src.value = await electron.ipcRenderer.invoke("getImg", props.data.pic);

  loading.value = false;
})();
</script>

<style scoped lang="scss">
li {
  width: 170px;
  height: 240px;

  border-radius: 0.5rem;
  box-shadow: 0 1px 5px 2px rgba(#000, 0.1);

  > div {
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: v-bind("mainColor");

    transition: 0.1s;

    > p {
      text-shadow: 0.5px 0.5px 3px #000;
    }

    > img {
      display: none;

      filter: drop-shadow(0 1px 1px rgba(#000, 0.5));
    }
  }

  &:hover {
    > div {
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
