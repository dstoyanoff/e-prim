export const pxOrRaw = (value: string | number, numberTransform: (value: number) => number = v => v) =>
  typeof value === "number" ? `${numberTransform(value)}px` : value;
