import { useConfigStore } from "@/stores/useConfigStore";

export const useElectron = () => {
  const configStore = useConfigStore();

  /**
   * 通过id获取url
   */
  const getUrl = async (id: string) => {
    return await electron.ipcRenderer.invoke("getUrl", {
      id,
      cookie: configStore.data.cookie,
    });
  };

  /**
   * 通过keyword搜索
   */
  const search = async (keyword: string) => {
    return await electron.ipcRenderer.invoke("search", {
      keyword,
      cookie: configStore.data.cookie,
    });
  };

  return {
    getUrl,
    search,
  };
};
