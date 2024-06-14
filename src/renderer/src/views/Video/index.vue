<template>
  <section class="f-1 o-h">
    <webview
      class="wh-100"
      v-show="selectedName"
      :data-name="selectedName"
      :src="`https://jx.xmflv.com/?url=${selectedVideo?.url}`"
    ></webview>
  </section>
</template>

<script setup lang="ts">
import { useListStore } from "@/stores/useListStore";
// import { timeStringToSeconds } from "@/hooks/useTimeToSecond";

type El = HTMLElement & {
  insertCSS: (code: string) => void;
  executeJavaScript: (code: string) => Promise<any>;
};

const { selectedVideo, selectedName } = storeToRefs(useListStore());

onMounted(() => {
  const webview = document.querySelector("webview") as El;

  webview.addEventListener("did-finish-load", async () => {
    //获取css
    const css = await api.getVideoCss();
    webview.insertCSS(css);

    //获取js
    if (selectedVideo.value) {
      let js = await api.getVideoJs();

      js = js.replaceAll("jumpStart", selectedVideo.value.jumpStart);
      js = js.replaceAll("jumpEnd", selectedVideo.value.jumpEnd);

      webview.executeJavaScript(js);
    }
  });
});
</script>

<style scoped lang="scss">
section {
  margin: 0 0.5rem 0.5rem;
  background-color: #131313;
  border-radius: 0.5rem;

  // .playrate {
  //   top: 20px;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   display: none;
  //   padding: 0.5rem 0.8rem;
  //   border-radius: 5px;
  //   background-color: rgba(33, 33, 33, 0.9);
  //   gap: 0.5rem;
  //   z-index: 998;
  //   font-size: 14px;
  //   align-items: center;
  //   position: fixed;

  //   svg {
  //     width: 30px;
  //     > g {
  //       opacity: 0.2;
  //       animation: o 1s infinite;
  //     }

  //     > g:nth-child(1) {
  //       animation-delay: 0.4s;
  //     }

  //     > g:nth-child(2) {
  //       animation-delay: 0.2s;
  //     }

  //     > g:nth-child(3) {
  //       animation-delay: 0s;
  //     }
  //   }

  //   @keyframes o {
  //     0% {
  //       opacity: 0.2;
  //     }
  //     50% {
  //       opacity: 0.8;
  //     }
  //     100% {
  //       opacity: 0.2;
  //     }
  //   }
  // }
}
</style>
