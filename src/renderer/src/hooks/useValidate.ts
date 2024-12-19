export const validateKey = (obj1: Object, obj2: Object) => {
  const key1 = Object.keys(obj1).sort();
  const key2 = Object.keys(obj2).sort();

  return JSON.stringify(key1) === JSON.stringify(key2);
};
