import { ElLoading } from "element-plus";

export const useLoading = <T extends (...args: any[]) => any>(callback: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const loading = ElLoading.service({
      lock: true,
      background: "rgba(0, 0, 0, 0.7)",
    });

    try {
      return await callback(...args);
    } finally {
      loading.close();
    }
  };
};
