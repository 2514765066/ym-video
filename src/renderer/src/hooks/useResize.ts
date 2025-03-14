import { debounce } from "@/utils/debounce";

export const useResize = (container: Ref<HTMLElement | undefined>) => {
  const colCount = ref(0);

  const resize = debounce(() => {
    if (!container.value) {
      return;
    }

    const style = getComputedStyle(container.value);
    colCount.value = style.gridTemplateColumns.split(" ").length;
  });

  onMounted(() => {
    window.addEventListener("resize", resize);
    resize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });

  return {
    colCount,
  };
};
