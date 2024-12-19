<template>
  <el-skeleton style="width: 140px; height: 215px" :loading="loading" animated>
    <template #template>
      <el-skeleton-item
        variant="image"
        style="width: 140px; height: 190px; border-radius: 5px"
      />

      <el-skeleton-item variant="text" style="width: 50%; margin-top: 5px" />
    </template>

    <template #default>
      <li class="h g-1 click" @click="handleClick">
        <div class="o-h p-r">
          <img :src="src" class="wh-100" />
          <span class="p-a fs-12">{{ data.year }}</span>
        </div>

        <p class="fs-14 ellipsis">{{ data.name }}</p>
      </li>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem, ElLoading } from "element-plus";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useElectron } from "@/hooks/useElectron";

const videoStore = useVideoStore();
const { getUrl } = useElectron();

const props = defineProps<{
  data: MovieInfo;
}>();

//图片的base64
const src = ref("");

const loading = ref(true);

//处理点击
const handleClick = async () => {
  if (videoStore.has(props.data.id)) {
    eventEmitter.emit("video:show");
    return;
  }

  const instance = ElLoading.service({
    lock: true,
    background: "rgba(0, 0, 0, 0.7)",
  });

  const urls: string[] = await getUrl(props.data.id);

  instance.close();

  if (urls.length == 0) {
    eventEmitter.emit(
      "error:show",
      "您的访问过于频繁可能被封禁了，请过段时间再重试或在设置中切换cookie"
    );
    return;
  }

  videoStore.add({ ...props.data, url: urls[0], img: src.value });

  eventEmitter.emit("video:show");
};

//初始化获取图片
(async () => {
  src.value = await electron.ipcRenderer.invoke("getImg", props.data.img);
  loading.value = false;
})();
</script>

<style scoped lang="scss">
li {
  width: 140px;
  height: 215px;

  > div {
    width: inherit;
    height: 190px;
    border-radius: 5px;

    > img {
      transition: 0.2s transform;
    }

    > span {
      padding: 0 5px;
      top: 0;
      left: 0;
      background-color: #ff8232;
      border-bottom-right-radius: 5px;
      text-shadow: 1px 1px 1px #333;
    }
  }

  > p {
    transition: 0.1s color;
  }

  &:hover {
    > p {
      color: #ff8232;
    }

    > div {
      > img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
