export const filterObj = <T extends Object>(
  obj: T,
  callback: (arr: [string, any]) => void
) => {
  return Object.fromEntries(Object.entries(obj).filter(callback));
};
