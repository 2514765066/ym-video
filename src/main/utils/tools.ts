//处理播放url
export const handlePlayUrl = (url: string) => {
  return url.split("#").map((item, index) => {
    const [label, url] = item.split("$");

    return {
      label: label,
      value: index,
      currentTime: 0,
      duration: 0,
      url,
    };
  });
};
