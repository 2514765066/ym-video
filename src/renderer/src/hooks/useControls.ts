export const isFullScreen = ref(false);

export function close() {
  api.close();
}

export function maximize() {
  api.maximize();
}

export function minimize() {
  api.minimize();
}

electron.ipcRenderer.on("is:maximize", (_, res: boolean) => {
  isFullScreen.value = res;
});
