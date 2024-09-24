export const useControl = () => {
  const isFullScreen = ref(false);

  const close = () => {
    api.close();
  };

  const maximize = () => {
    api.maximize();
  };

  const minimize = () => {
    api.minimize();
  };

  electron.ipcRenderer.on("is:maximize", (_, res: boolean) => {
    isFullScreen.value = res;
  });

  return {
    isFullScreen,
    close,
    maximize,
    minimize,
  };
};
