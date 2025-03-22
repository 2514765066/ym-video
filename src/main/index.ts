import { isSecondeInstanceStart, onMounted } from "ym-electron.js";
import { app } from "electron";
import { createMain } from "./manage";
import "../api/ipc";
import "../api/updater";

//禁止多开
if (isSecondeInstanceStart()) {
  app.exit();
}

onMounted(() => {
  createMain();
});
