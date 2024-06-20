export const timeStringToSeconds = (timeString: string | null) => {
  if (!timeString) return 0;

  const timeParts = timeString.split(":");
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2], 10);

  return hours * 3600 + minutes * 60 + seconds;
};
