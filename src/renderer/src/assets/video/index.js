const getElement = selectors => {
  return new Promise(resolve => {
    const timer = setInterval(() => {
      const video = document.querySelector(selectors);

      if (video) {
        clearInterval(timer);
        resolve(video);
      }
    }, 200);
  });
};

//创建倍速提示元素
const createPlayrate = async () => {
  const tempDiv = document.createElement("div");

  tempDiv.innerHTML = `
   <div class="playrate">
        <svg viewBox="0 0 111 66">
            <g transform="matrix(1,0,0,1,94.5,32.5)">
              <g transform="matrix(0,3,-3,0,0,0)">
                <path
                  fill="#fff"
                  d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"
                ></path>
              </g>
            </g>

            <g transform="matrix(1,0,0,1,55.5,32.5)">
              <g transform="matrix(0,3,-3,0,0,0)">
                <path
                  fill="#fff"
                  d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"
                ></path>
              </g>
            </g>

            <g transform="matrix(1,0,0,1,16.5,32.5)">
              <g transform="matrix(0,3,-3,0,0,0)">
                <path
                  fill="#fff"
                  d=" M6.138000011444092,3.5460000038146973 C6.4679999351501465,4.105999946594238 6.2779998779296875,4.826000213623047 5.7179999351501465,5.156000137329102 C5.538000106811523,5.265999794006348 5.3379998207092285,5.326000213623047 5.118000030517578,5.326000213623047 C5.118000030517578,5.326000213623047 -5.122000217437744,5.326000213623047 -5.122000217437744,5.326000213623047 C-5.771999835968018,5.326000213623047 -6.302000045776367,4.796000003814697 -6.302000045776367,4.145999908447266 C-6.302000045776367,3.936000108718872 -6.242000102996826,3.7260000705718994 -6.142000198364258,3.5460000038146973 C-6.142000198364258,3.5460000038146973 -1.3519999980926514,-4.553999900817871 -1.3519999980926514,-4.553999900817871 C-0.9120000004768372,-5.294000148773193 0.04800000041723251,-5.544000148773193 0.7979999780654907,-5.104000091552734 C1.027999997138977,-4.973999977111816 1.218000054359436,-4.783999919891357 1.3480000495910645,-4.553999900817871 C1.3480000495910645,-4.553999900817871 6.138000011444092,3.5460000038146973 6.138000011444092,3.5460000038146973z"
                ></path>
              </g>
            </g>
        </svg>
        <span>3倍速播放中</span>
     </div>`;

  const parsedElement = tempDiv.firstElementChild;

  const el = await getElement(".art-video-player");

  el.appendChild(parsedElement);

  return parsedElement;
};

(async () => {
  const video = await getElement("video");
  const playrate = await createPlayrate();

  //重写方向键事件
  const overrideArrowKeyEvent = () => {
    let holdTimeout;
    let isHolding = false;

    window.addEventListener(
      "keydown",
      e => {
        e.stopImmediatePropagation();

        switch (e.key) {
          case "ArrowRight":
            if (isHolding == true) return;

            holdTimeout = setTimeout(() => {
              isHolding = true;
              video.playbackRate = 3;
              playrate.style.display = "flex";
            }, 300);
            return;
        }
      },
      true
    );

    window.addEventListener(
      "keyup",
      e => {
        e.stopImmediatePropagation();

        switch (e.key) {
          case "ArrowRight":
            clearTimeout(holdTimeout);

            if (isHolding) {
              isHolding = false;
              video.playbackRate = 1;
              playrate.style.display = "none";
              return;
            }

            XMlayEr.void.forward = 5;
            return;
          case "ArrowLeft":
            XMlayEr.void.backward = 5;
            return;
          case " ":
            XMlayEr.void.toggle();
            return;
          case "ArrowUp":
            XMlayEr.void.volume += 0.1;
            return;
          case "ArrowDown":
            XMlayEr.void.volume -= 0.1;
            return;
        }
      },
      true
    );
  };

  overrideArrowKeyEvent();
})();
