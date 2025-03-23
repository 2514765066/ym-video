import {
  isSecondeInstanceStart,
  onMounted,
  onSecondeInstanceMounted,
} from "ym-electron.js";
import { app } from "electron";
import { createMain } from "./manage";
import "../api/ipc";
import "../api/updater";

//禁止多开
if (isSecondeInstanceStart()) {
  app.exit();
}

onMounted(async () => {
  const win = await createMain();

  onSecondeInstanceMounted(() => {
    win.show();
  });
});
