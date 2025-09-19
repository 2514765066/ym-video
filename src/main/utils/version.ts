declare global {
  const __APP_VERSION__: string;
}

//格式化版本
const formatVersion = (version: string) => {
  const [major, minor, patch] = version.split(".").map(Number);

  return major * 1000000 + minor * 1000 + patch;
};

//最小使用的版本
export const minVersion = formatVersion("4.6.0");

//当前版本
export const version = formatVersion(__APP_VERSION__);
