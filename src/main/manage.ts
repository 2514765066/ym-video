import { join } from "path";
import { createWindow, onMounted } from "ym-electron.js";
import { EventNames } from "../type";

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

  win.on("maximize", () => {
    win.webContents.send<EventNames>("is:maximize", true);
  });

  win.on("unmaximize", () => {
    win.webContents.send<EventNames>("is:maximize", false);
  });
});
