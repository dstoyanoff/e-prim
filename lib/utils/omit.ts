export const omit = <T extends object>(obj: T, ...keys: (keyof T)[]) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keys.includes(key as keyof T)) {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, unknown>) as T;
};
