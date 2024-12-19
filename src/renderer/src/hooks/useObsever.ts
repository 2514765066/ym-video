export const useObsever = (
  element,
  callback: () => void,
  option: MutationObserverInit
) => {
  const observer = new MutationObserver(() => {
    callback();
  });

  observer.observe(element, option);
};
