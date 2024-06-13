import { join } from "path";
import { createWindow, onMounted } from "ym-electron.js";
import { EventNames } from "../type";

onMounted(() => {
  const win = createWindow("manage", {
    // x: 2000,
    // y: -100,
    // devTool: true,
    frame: false,
    width: 1200,
    height: 800,

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
      sandbox: false,
      preload: join(__dirname, "../preload/index.mjs"),
    },
  });

  win.setSize(1200, 800);

  win.on("maximize", () => {
    win.webContents.send<EventNames>("is:maximize", true);
  });

  win.on("unmaximize", () => {
    win.webContents.send<EventNames>("is:maximize", false);
  });
});
