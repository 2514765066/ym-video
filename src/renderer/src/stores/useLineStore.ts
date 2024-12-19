export const useLineStore = defineStore("line", () => {
  const data = ["https://jx.xmflv.com/?url=", "https://am1907.top/?jx="];

  //线路
  const selectedIndex = ref(0);

  //当前选中
  const selectedLine = computed(() => data[selectedIndex.value]);

  //切换线路
  const change = () => {
    if (selectedIndex.value + 1 == data.length) {
      selectedIndex.value = 0;
      return;
    }

    selectedIndex.value++;
  };

  return {
    selectedLine,
    change,
  };
});
