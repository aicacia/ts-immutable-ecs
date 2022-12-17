"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitive = exports.clamp = void 0;
function clamp(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
exports.clamp = clamp;
function isPrimitive(value) {
    if (value === null) {
        return false;
    }
    const type = typeof value;
    return !(type === "object" || type === "function");
}
exports.isPrimitive = isPrimitive;
