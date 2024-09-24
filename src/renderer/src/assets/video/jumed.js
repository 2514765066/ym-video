(async () => {
  const video = await getElement("video");

  //跳过片头
  if (video.currentTime <= $jumpStart) {
    video.currentTime = $jumpStart;
  }

  //跳过片尾
  const timeupdate = () => {
    if (video.duration - video.currentTime <= $jumpEnd) {
      video.currentTime = video.duration;
      video.removeEventListener("timeupdate", timeupdate, true);
    }
  };

  video.addEventListener("timeupdate", timeupdate, true);
})();
