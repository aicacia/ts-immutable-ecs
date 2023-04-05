import { mat2d, mat4, quat, vec2, vec3 } from "gl-matrix";
import { Record } from "immutable";
declare const Transform2D_base: Record.Factory<{
    position: vec2;
    scale: vec2;
    rotation: number;
}>;
export declare class Transform2D extends Transform2D_base {
    static toString(): string;
    is2D(): this is Transform2D;
    is3D(): this is never;
    getMatrix2D(out: mat2d): mat2d;
    getMatrix(out: mat4): mat4;
}
declare const Transform3D_base: Record.Factory<{
    position: vec3;
    scale: vec3;
    rotation: quat;
}>;
export declare class Transform3D extends Transform3D_base {
    static toString(): string;
    is2D(): this is never;
    is3D(): this is Transform3D;
    getMatrix2D(out: mat2d): mat2d;
    getMatrix(out: mat4): mat4;
}
declare const GlobalTransform2D_base: Record.Factory<{
    matrix: mat2d;
}>;
export declare class GlobalTransform2D extends GlobalTransform2D_base {
    static toString(): string;
    is2D(): this is GlobalTransform2D;
    is3D(): this is never;
    setMatrix(matrix: mat2d): this;
    getMatrix2D(out: mat2d): mat2d;
    getMatrix(out: mat4): mat4;
}
declare const GlobalTransform3D_base: Record.Factory<{
    matrix: mat4;
}>;
export declare class GlobalTransform3D extends GlobalTransform3D_base {
    static toString(): string;
    is2D(): this is never;
    is3D(): this is GlobalTransform3D;
    setMatrix(matrix: mat4): this;
    getMatrix2D(out: mat2d): mat2d;
    getMatrix(out: mat4): mat4;
}
export {};
