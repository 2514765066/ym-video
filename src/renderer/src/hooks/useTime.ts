export const timeStringToSeconds = (timeString: string = "00:00:00") => {
  const timeParts = timeString.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  return hours * 3600 + minutes * 60 + seconds + "";
};

export const secondsToTimeString = (seconds: number = 0) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};
