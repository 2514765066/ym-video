export const controlVisible = ref(true);

let timer: number;

//展示控件模块
export const showControl = (delay: number = 1000) => {
  controlVisible.value = true;

  clearTimeout(timer);

  timer = window.setTimeout(() => {
    hideControl();
  }, delay);
};

//隐藏控件模块
const hideControl = () => {
  controlVisible.value = false;
};
