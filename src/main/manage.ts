import { join } from "path";
import { isDev, onMounted } from "ym-electron.js";
import { BrowserWindow } from "electron";
import { browserWindows } from "../api/windows";

onMounted(async () => {
  const bw = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 750,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      symbolColor: "#d4d4d4",
      color: "rgba(0,0,0,0)",
      height: 44,
    },
    show: false,

    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
      devTools: isDev(),
    },
  });

  browserWindows.set("manage", bw);

  if (isDev()) {
    bw.webContents.openDevTools({ mode: "detach" });
    await bw.loadURL(process.env["ELECTRON_RENDERER_URL"]!);
  } else {
    await bw.loadFile(join(__dirname, "../renderer/index.html"));
  }

  bw.show();
});
