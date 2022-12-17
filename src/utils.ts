export function clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function isPrimitive(
  value: unknown
): value is string | number | boolean | undefined {
  if (value === null) {
    return false;
  }
  const type = typeof value;
  return !(type === "object" || type === "function");
}
