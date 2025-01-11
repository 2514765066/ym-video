import { join } from "path";
import { createWindow, onMounted, getScreenSize } from "ym-electron.js";

onMounted(() => {
  let width = 1165;
  let height = 900;

  const screen = getScreenSize();

  if (screen.height * 0.9 < 900) {
    height = screen.height * 0.9;
  }

  const win = createWindow("manage", {
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
    win.webContents.send("is:maximize", true);
  });

  win.on("unmaximize", () => {
    win.webContents.send("is:maximize", false);
  });
});
