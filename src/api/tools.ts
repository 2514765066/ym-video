export const handlePlayUrl = (url: string) => {
  const regex = /https?:\/\/[^\s#]+/g;

  const res: string[] = url.match(regex)!;

  return res;
};

//可以重试的fetch
export const fetchWithRetry = async (url: string, maxRetries = 3) => {
  while (maxRetries > 0) {
    const response = await fetch(url);

    //请求失败重试
    if (!response.ok) {
      maxRetries--;

      if (maxRetries <= 0) {
        throw new Error();
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      continue;
    }

    return response;
  }

  throw new Error();
};

//超时的fetch
export async function fetchWithTimeout(url: string, timeout = 10000) {
  const controller = new AbortController();

  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(id);
  }
}
