import { isFullscreen } from "./useFullscreen";

//控制显示
export const controlVisible = ref(true);

//是否悬浮再控制组件中
export const isHover = ref(false);

//bottom隐藏的计时器
let timer: any;

//在player中移动触发
export const handleMouseMove = () => {
  clearTimeout(timer);

  if (isHover.value || !isFullscreen.value) {
    return;
  }

  controlVisible.value = true;

  timer = setTimeout(() => {
    controlVisible.value = false;
  }, 2000);
};
