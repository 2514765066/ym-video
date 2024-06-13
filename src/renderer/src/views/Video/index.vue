<template>
  <section class="f-1 o-h">
    <webview
      class="wh-100"
      v-show="selectedName"
      :data-name="selectedName"
      :src="`https://jx.xmflv.com/?url=${selectedVideo?.url}`"
    ></webview>

    <!-- <div class="playrate">
      <svg viewBox="0 0 111 66">
        <g transform="matrix(1,0,0,1,94.5,32.5)">
          <g transform="matrix(0,3,-3,0,0,0)">
            <path
              fill="#fff"
              d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"
            ></path>
          </g>
        </g>

        <g transform="matrix(1,0,0,1,55.5,32.5)">
          <g transform="matrix(0,3,-3,0,0,0)">
            <path
              fill="#fff"
              d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"
            ></path>
          </g>
        </g>

        <g transform="matrix(1,0,0,1,16.5,32.5)">
          <g transform="matrix(0,3,-3,0,0,0)">
            <path
              fill="#fff"
              d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"
            ></path>
          </g>
        </g>
      </svg>

      <span>倍速播放中</span>
    </div> -->
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
      #adv_wrap_hh, 
      .broadside,
      .art-control-pip,
      .art-control-setting{
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

       .playrate {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.5rem 0.8rem;
        border-radius: 5px;
        background-color: rgba(33, 33, 33, 0.9);
        gap: 0.5rem;
        z-index: 998;
        font-size: 14px;
        display: flex;
        align-items: center;
        position: fixed;

        svg {
          width: 30px;
          > g {
            opacity: 0.2;
            animation: o 1s infinite;
          }

          > g:nth-child(1) {
            animation-delay: 0.4s;
          }

          > g:nth-child(2) {
            animation-delay: 0.2s;
          }

          > g:nth-child(3) {
            animation-delay: 0s;
          }
        }

        @keyframes o {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.2;
          }
        }
      }
    `);

    webview.executeJavaScript(`
      //等待元素被找到
      const getEl = new Promise(resolve => {
        const timer = setInterval(() => {
          const el = document.querySelector("video");

          if (el) {
            clearInterval(timer);
            resolve(el);
          }
        }, 200);
      });

      //跳过片头片尾
      getEl.then(el => {
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

        //给方向键加事件
        window.addEventListener('keydown', (event) => {
          event.stopImmediatePropagation();

            if(event.key == "ArrowRight"){
            el.playbackRate = 3
          }
        }, true);

        window.addEventListener('keyup', (event) => {
          event.stopImmediatePropagation();

            if(event.key == "ArrowRight"){
              el.playbackRate = 1
            }
        }, true);
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
  .playrate {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    padding: 0.5rem 0.8rem;
    border-radius: 5px;
    background-color: rgba(33, 33, 33, 0.9);
    gap: 0.5rem;
    z-index: 998;
    font-size: 14px;
    align-items: center;
    position: fixed;

    svg {
      width: 30px;
      > g {
        opacity: 0.2;
        animation: o 1s infinite;
      }

      > g:nth-child(1) {
        animation-delay: 0.4s;
      }

      > g:nth-child(2) {
        animation-delay: 0.2s;
      }

      > g:nth-child(3) {
        animation-delay: 0s;
      }
    }

    @keyframes o {
      0% {
        opacity: 0.2;
      }
      50% {
        opacity: 0.8;
      }
      100% {
        opacity: 0.2;
      }
    }
  }
}
</style>
