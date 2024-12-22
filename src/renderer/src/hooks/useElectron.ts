import { useConfigStore } from "@/stores/useConfigStore";
import { useLoading } from "@/hooks/useLoading";

export const useElectron = () => {
  const configStore = useConfigStore();

  /**
   * 通过id获取url
   */
  const getUrl = useLoading(async (id: string) => {
    return (await electron.ipcRenderer.invoke("getUrl", {
      id,
      cookie: configStore.data.cookie,
    })) as { status: number; data: string[] };
  });

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
