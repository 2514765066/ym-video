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
import { timeStringToSeconds } from "@/hooks/useTimeToSecond";

type El = HTMLElement & {
  insertCSS: (code: string) => void;
  executeJavaScript: (code: string) => Promise<any>;
};

const { selectedVideo, selectedName } = storeToRefs(useListStore());

onMounted(() => {
  const webview = document.querySelector("webview") as El;

  webview.addEventListener("did-finish-load", () => {
    webview.insertCSS(`
      #adv_wrap_hh{
        display:none !important
      }
      #loading{
        background:none !important;
        background-color:#131313 !important;
      }
      #error{
        top:0;
        background:none !important;
        background-color:#131313 !important;
      }
      .broadside,.art-control-pip {
       display:none !important
      }
    `);

    webview.executeJavaScript(`
      const p = new Promise(resolve => {
        const timer = setInterval(() => {
          const el = document.querySelector("video");

          if (el) {
            clearInterval(timer);
            resolve(el);
          }
        }, 200);
      });

      p.then(el => {
        el.currentTime = ${timeStringToSeconds(selectedVideo.value?.jumpStart)};

        function timeupdate(){
          if (
            el.duration - el.currentTime <=
            ${timeStringToSeconds(selectedVideo.value?.jumpEnd)}
          ) {
            el.currentTime = el.duration + 1;
            el.removeEventListener("timeupdate", timeupdate)
          }
        }

        el.addEventListener("timeupdate", timeupdate);
      });
    `);
  });
});
</script>

<style scoped lang="scss">
section {
  margin: 0 0.5rem 0.5rem;
  background-color: #131313;
  border-radius: 0.5rem;
}
</style>
