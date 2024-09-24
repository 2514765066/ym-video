import { WebView } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import { timeStringToSeconds } from "@/hooks/useTime";

import initCSSRaw from "@/assets/video/index.css?raw";
import initJSRaw from "@/assets/video/index.js?raw";
import getCurrentTimeJSRaw from "@/assets/video/getCurrentTime.js?raw";
import jumedJSRaw from "@/assets/video/jumed.js?raw";

export const useVideo = () => {
  const { selectedVideo } = storeToRefs(useVideoStore());

  //导入css
  const initCSS = () => {
    const webview = document.querySelector("#video") as WebView;

    webview.insertCSS(initCSSRaw);
  };

  //导入js
  const initJS = () => {
    const webview = document.querySelector("#video") as WebView;

    webview.executeJavaScript(initJSRaw);

    jumedJS();
  };

  //跳过片头和片尾
  const jumedJS = () => {
    const webview = document.querySelector("#video") as WebView;

    webview.executeJavaScript(
      jumedJSRaw
        .replaceAll(
          "$jumpStart",
          timeStringToSeconds(selectedVideo.value?.jumpStart)
        )
        .replaceAll(
          " $jumpEnd",
          timeStringToSeconds(selectedVideo.value?.jumpEnd)
        )
    );
  };

  //获取当前播放时间和视频总时长
  const getCurrentTime = async () => {
    const webview = document.querySelector("#video") as WebView;

    return await webview.executeJavaScript(getCurrentTimeJSRaw);
  };

  //刷新页面
  const reload = () => {
    const webview = document.querySelector("#video") as WebView;

    webview.reload();
  };

  return {
    initJS,
    initCSS,
    jumedJS,
    getCurrentTime,
    reload,
  };
};
