export const getSvg = (name: string) => {
  return new URL(`../assets/svg/${name}.svg`, import.meta.url);
};
