//获取当前时间
export const getTimeOfDay = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) {
    return "早上"; // 早上：5:00 - 10:59
  } else if (hours >= 11 && hours < 14) {
    return "中午"; // 中午：11:00 - 13:59
  } else if (hours >= 14 && hours < 18) {
    return "下午"; // 下午：14:00 - 17:59
  } else {
    return "晚上"; // 晚上：18:00 - 4:59
  }
};

//格式化时间
export const formatTime = (seconde: number) => {
  if (seconde < 0) {
    return "00:00";
  }

  const hours = Math.floor(seconde / 3600);

  const minutes = Math.floor((seconde % 3600) / 60);

  const seconds = Math.floor(seconde % 60);

  // 返回格式化的字符串（始终两位数字）
  if (hours == 0) {
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const pad = (num: number | string) => {
  return num.toString().padStart(2, "0");
};
