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

type El = HTMLElement & {
  src: string;
  insertCSS: (code: string) => void;
  executeJavaScript: (code: string) => Promise<any>;
};

const { selectedVideo, selectedName } = storeToRefs(useListStore());

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    const el = mutation.target as El;

    if (el.dataset.name == selectedName.value) {
      const url = el.src.split("https://jx.xmflv.com/?url=")[1];
      selectedVideo.value!.url = url;
    }
  }
});

onMounted(() => {
  const webview = document.querySelector("webview") as El;

  observer.observe(webview, {
    attributes: true,
    attributeFilter: ["src", "data-name"],
  });

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
}
</style>
