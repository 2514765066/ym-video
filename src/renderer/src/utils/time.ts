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
