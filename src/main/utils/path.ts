import { app } from "electron";
import { join } from "path";
import { isDev } from "ym-electron.js";

export const resources = isDev()
  ? join(__dirname, "../../test")
  : app.getPath("userData");
