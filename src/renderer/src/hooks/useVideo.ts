import { WebView } from "@type";
import { useListStore } from "@/stores/useListStore";
import { useConfigStore } from "@/stores/useConfigStore";
import pinia from "@/stores";
import { timeStringToSeconds } from "@/hooks/useTime";

const { selectedVideo } = storeToRefs(useListStore(pinia));
const { data } = storeToRefs(useConfigStore(pinia));

export const load = () => {
  //获取元素
  const webview = document.querySelector("webview") as WebView;

  //导入css
  async function importCss() {
    const css = await api.getVideoCss();
    webview.insertCSS(css);
  }

  //导入js
  async function importJs() {
    let js = await api.getVideoJs();

    const replacements = {
      $jumpStart: timeStringToSeconds(selectedVideo.value!.jumpStart),
      $jumpEnd: timeStringToSeconds(selectedVideo.value!.jumpEnd),
      $defaultRate: selectedVideo.value!.defaultRate,
      $danmuShow: data.value!.danmuShow,
      $danmuHeight: data.value!.danmuHeight,
    };

    js = Object.entries(replacements).reduce(
      (acc, [key, value]) => acc.replaceAll(key, `${value}`),
      js
    );

    webview.executeJavaScript(js);
  }

  return {
    importJs,
    importCss,
  };
};
