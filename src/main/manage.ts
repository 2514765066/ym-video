import { join } from "path";
import { createWindow, onMounted, getScreenSize } from "ym-electron.js";
import { EventNames } from "../type";

onMounted(() => {
  let width = 1200;
  let height = 900;

  const screen = getScreenSize();

  if (screen.height * 0.9 < 900) {
    height = screen.height * 0.9;
    width = (height / 3) * 4;
  }

  const win = createWindow("manage", {
    // x: 3000,
    // y: -100,
    // devTool: true,

    width,
    height,
    minWidth: 1000,
    minHeight: 750,
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
      devTools: false,
    },
  });

  win.on("maximize", () => {
    win.webContents.send<EventNames>("is:maximize", true);
  });

  win.on("unmaximize", () => {
    win.webContents.send<EventNames>("is:maximize", false);
  });
});
