import { readFile } from "fs/promises";
import { join } from "path";

window.addEventListener("DOMContentLoaded", async () => {
  const buffer = await readFile(join(__dirname, "../../resources/video.css"));

  const css = buffer.toString();

  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);
});
