import { join } from "path";
import { createWindow, isDev } from "ym-electron.js";
import { ipcMain } from "../api/ipcMain";

export const mainWindow = createWindow(
  async bw => {
    bw.on("maximize", () => {
      bw.webContents.send("is:maximize", true);
    });

    bw.on("restore", () => {
      bw.webContents.send("is:maximize", false);
    });

    ipcMain.on("minimize", () => {
      bw.minimize();
    });

    ipcMain.on("maximize", () => {
      bw.isMaximized() ? bw.restore() : bw.maximize();
    });

    ipcMain.on("close", () => {
      bw.close();
    });

    if (isDev()) {
      // bw.webContents.openDevTools({ mode: "detach" });
      await bw.loadURL(process.env["ELECTRON_RENDERER_URL"]!);
    } else {
      await bw.loadFile(join(__dirname, "../renderer/index.html"));
    }

    bw.show();
  },
  {
    width: 1165,
    height: 900,
    minWidth: 1000,
    minHeight: 750,
    frame: false,
    show: false,

    webPreferences: {
      preload: join(__dirname, "../preload/index.mjs"),
      sandbox: false,
      devTools: false,
    },
  }
);
