import { join } from "path";
import { createWindow, onMounted } from "ym-electron.js";
import { EventNames } from "../type";
// import { WebContentsView } from "electron";

onMounted(() => {
  const win = createWindow("manage", {
    x: 2000,
    y: -100,
    devTool: true,
    frame: false,

    render: {
      dev: {
        url: `${process.env["ELECTRON_RENDERER_URL"]}`,
      },
      dep: {
        path: join(__dirname, "../renderer/index.html"),
      },
    },

    webPreferences: {
      webviewTag: true,
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
    },
  });

  // const video = new WebContentsView({
  //   webPreferences: {
  //     preload: join(__dirname, "../preload/video.mjs"),
  //     sandbox: false,
  //   },
  // });

  // video.webContents.loadURL(
  //   "https://jx.xmflv.com/?url=https://www.iqiyi.com/v_19ruzj8gv0.html?s2=3&s3=pca_115_number_enlarge&s4=0&vfrm=3&vfrmblk=pca_115_number_enlarge&vfrmrst=0"
  // );

  // win.contentView.addChildView(video);

  win.on("maximize", () => {
    win.webContents.send<EventNames>("is:maximize", true);
  });

  win.on("unmaximize", () => {
    win.webContents.send<EventNames>("is:maximize", false);
  });

  // function resize() {
  //   const [width, height] = win.getSize();

  //   video.setBounds({
  //     x: 8,
  //     y: 38,
  //     width: width - 16,
  //     height: height - 38 - 8,
  //   });
  // }

  // win.on("resize", resize);

  // resize();

  // video.webContents.openDevTools({ mode: "detach" });
});
