export const handlePlayUrl = (url: string) => {
  const regex = /https?:\/\/[^\s#]+/g;

  return url.match(regex)!;
};
