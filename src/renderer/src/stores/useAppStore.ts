export const useAppStore = defineStore("app", () => {
  const version = __APP_VERSION__;

  const name = __APP_NAME__;

  return {
    version,
    name,
  };
});
