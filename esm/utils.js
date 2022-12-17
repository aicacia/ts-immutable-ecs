export function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
export function isPrimitive(value) {
    if (value === null) {
        return false;
    }
    const type = typeof value;
    return !(type === "object" || type === "function");
}
