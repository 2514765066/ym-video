export const handlePlayUrl = (url: string) => {
  //多集
  if (url.includes("#")) {
    const match = [...url.matchAll(/\$(.*?)#/g)];

    return match.map(item => item[1]);
  }

  //一集
  return [url.split("$")[1]];
};
