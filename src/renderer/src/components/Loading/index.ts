import Loading from "./Loading.vue";
import type { App } from "vue";

let app: App<Element> | null = null;
let container: HTMLDivElement | null = null;

const openLoading = (title?: string) => {
  if (app) return;

  container = document.createElement("div");
  document.body.appendChild(container);

  app = createApp(() => h(Loading, { title }));

  app.mount(container);
};

const closeLoading = () => {
  if (!app || !container) return;

  app.unmount();
  app = null;

  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }

  container = null;
};

export { openLoading, closeLoading };
