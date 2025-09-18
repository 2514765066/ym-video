declare global {
  const __APP_VERSION__: string;
}

let version = 0;

//获取当前版本
export const getVersion = () => {
  if (version != 0) {
    return version;
  }

  version = formatVersion(__APP_VERSION__);

  return version;
};

//格式化版本
const formatVersion = (version: string) => {
  const [major, minor, patch] = version.split(".").map(Number);

  return major * 1000000 + minor * 1000 + patch;
};

//最小使用的版本
export const minVersion = formatVersion("4.5.0");
