(() => {
  const video = document.querySelector("video");

  return {
    currentTime: video.currentTime,
    duration: video.duration,
  };
})();
