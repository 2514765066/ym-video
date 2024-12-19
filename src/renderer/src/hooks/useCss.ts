export const formatUnit = (unit: string | number | undefined) => {
  if (!unit) {
    return "unset";
  }

  if (typeof unit === "number") {
    return `${unit}px`;
  }

  if (typeof unit === "string") {
    return Object.is(Number(unit), NaN) ? unit : `${unit}px`;
  }

  return "unset";
};
