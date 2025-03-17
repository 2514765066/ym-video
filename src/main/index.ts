import { isSecondeInstanceStart } from "ym-electron.js";
import { app } from "electron";
import "../api/ipc";
import "./manage";
import "../api/updater";

//禁止多开
if (isSecondeInstanceStart()) {
  app.exit();
}
