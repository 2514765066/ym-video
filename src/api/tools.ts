export const handlePlayUrl = (url: string) => {
  const regex = /https?:\/\/[^\s#]+/g;

  return url.match(regex)!;
};

export const fetchWithRetry = async (
  url: string,
  maxRetries = 3,
  delay = 1000
) => {
  let attempt = 0;

  // 尝试请求并重试
  while (attempt < maxRetries) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response; // 请求成功，返回响应
    } catch (error) {
      attempt++;

      if (attempt >= maxRetries) {
        throw new Error("Max retries reached. Request failed.");
      }

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error();
};
