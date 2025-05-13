import Doc from "@/../../../release-note.md?raw";

export const useDocStore = defineStore("doc", () => {
  //电影数据
  const docData = ref<string[]>([]);

  const init = () => {
    const match = Doc.match(/##\s.*?\s*([\s\S]*?)##/);

    const matchData = match![1];

    const res = matchData.split("\r\n").filter(Boolean);

    docData.value = res.slice(1);
  };

  init();

  return {
    docData,
  };
});
