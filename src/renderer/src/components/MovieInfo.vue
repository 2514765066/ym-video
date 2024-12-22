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

          <button class="p-a" @click.stop="handleRemove" v-if="remove">
            <img src="@/assets/svg/remove.svg" width="20px" />
          </button>
        </div>

        <p class="fs-14 ellipsis">{{ data.name }}</p>
      </li>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useElectron } from "@/hooks/useElectron";
import { getLongestGroupByHostname } from "@/hooks/useGroup";

const videoStore = useVideoStore();
const { getUrl } = useElectron();

const props = defineProps<{
  data: MovieInfo;
  remove?: boolean;
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

  //获取资源
  const response = await getUrl(props.data.id);

  //处理403
  if (response.status == 403) {
    eventEmitter.emit("error:show", "请在设置中登录豆瓣账号或切换网络");
    return;
  }

  //处理404
  if (response.status == 404) {
    eventEmitter.emit("error:show", "资源不存在");
    return;
  }

  //获取最长的url
  const urls = getLongestGroupByHostname(response.data);

  //添加数据
  videoStore.add({
    name: props.data.name,
    year: props.data.year,
    id: props.data.id,
    url: urls,
    img: src.value,
    minVersion: __APP_VERSION__,
    history: urls[0],
  });

  eventEmitter.emit("video:show");
};

//处理移除
const handleRemove = () => {
  videoStore.remove(props.data.id);
  eventEmitter.emit("success:show", "移除成功");
};

//初始化获取图片
(async () => {
  if (props.data.img.includes("data:image/jpeg;base64")) {
    src.value = props.data.img;

    loading.value = false;
    return;
  }

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

    > button {
      padding: 5px;
      display: none;
      top: 0;
      right: 0;
      background-color: rgba(#000, 0.8);
      border-bottom-left-radius: 5px;
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

      > button {
        display: flex;
      }
    }
  }
}
</style>
