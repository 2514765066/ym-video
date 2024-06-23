<template>
  <el-drawer
    v-model="visible"
    direction="ltr"
    title="现已支持视频网站"
    size="350px"
  >
    <section class="h-100 g-2">
      <button
        v-for="{ name, url, src } of data"
        :key="name"
        @click="handleOpen(url)"
        class="fs-20"
      >
        <img :src="src" alt="" class="w-100" v-if="src" />
        <span v-else>{{ name }}</span>
      </button>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { ElDrawer } from "element-plus";

const data = [
  {
    name: "优酷视频",
    url: "https://youku.com/",
    src: "/src/assets/logo/yk.png",
  },
  {
    name: "爱奇艺",
    url: "https://www.iqiyi.com/",
    src: "/src/assets/logo/iqy.png",
  },
  {
    name: "腾讯视频",
    url: "https://v.qq.com/",
    src: "/src/assets/logo/txsp.png",
  },
  {
    name: "哔哩哔哩",
    url: "https://www.bilibili.com/",
    src: "/src/assets/logo/bilibili.png",
  },
  {
    name: "芒果tv",
    url: "https://www.mgtv.com/",
  },
  {
    name: "乐视视频",
    url: "https://www.le.com/",
    src: "/src/assets/logo/ls.png",
  },
  {
    name: "暴风影音",
    url: "http://www.baofeng.com/",
    src: "/src/assets/logo/bfyy.png",
  },
  {
    name: "风行网",
    url: "https://www.fun.tv/",
  },
  {
    name: "搜狐视频",
    url: "https://tv.sohu.com/",
  },
  {
    name: "AcFun",
    url: "https://www.acfun.cn/",
    src: "/src/assets/logo/acfun.png",
  },
  {
    name: "PP视频",
    url: "https://www.pptv.com/",
    src: "/src/assets/logo/ppsp.png",
  },
  {
    name: "1905",
    url: "http://promotion.m1905.com/",
    src: "/src/assets/logo/1905.png",
  },
  {
    name: "央视网",
    url: "https://tv.cctv.com/",
    src: "/src/assets/logo/cctv.png",
  },
  {
    name: "华数tv",
    url: "https://www.wasu.cn/",
    src: "/src/assets/logo/hstv.png",
  },
  {
    name: "时光网",
    url: "http://www.mtime.com/",
    src: "/src/assets/logo/mtime.png",
  },
  {
    name: "天天看看",
    url: "http://kankan.com/",
    src: "/src/assets/logo/kankan.png",
  },
  {
    name: "新浪视频",
    url: "https://video.sina.com.cn/",
  },
  {
    name: "土豆视频",
    url: "https://tudou.com/",
  },
];

const visible = ref(false);

function handleOpen(url: string) {
  api.openUrl(url);
}

eventEmitter.on("help:show", () => {
  visible.value = true;
});
</script>

<style scoped lang="scss">
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }

  > button {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #2a2d2e;
    width: 150px;
    height: 100px;
  }
}
</style>
