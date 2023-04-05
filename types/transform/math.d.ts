import { mat2d, vec2, mat4 } from "gl-matrix";
export declare const DEG_TO_RAD: number;
export declare const RAD_TO_DEG: number;
export declare const HALF_PI: number;
export declare const TAU: number;
export declare const EPSILON = 0.000001;
export declare function composeMat2d(out: mat2d, position: vec2, scale: vec2, rotation: number): mat2d;
export declare function extractScale(out: vec2, matrix: mat2d): vec2;
export declare function decomposeMat2d(matrix: mat2d, position: vec2, scale: vec2): number;
export declare function getRotationFromMat2d(matrix: mat2d): number;
export declare function getPointFromAngle(out: vec2, angle: number): vec2;
export declare function getAngleFromPoint(out: vec2): number;
export declare function getTangentAngle(vec: vec2): number;
export declare function getAngleBetweenPoints(a: vec2, b: vec2): number;
export declare function sign(value: number): 1 | -1;
export declare function angleVec2(out: vec2): number;
export declare function vec2FromAngle(out: vec2, angle: number): vec2;
export declare function projectPointOnAxis(out: vec2, point: vec2, axis: vec2): vec2;
export declare function radToDeg(rad: number): number;
export declare function degToRad(def: number): number;
export declare function equals(a: number, b: number): boolean;
export declare function mat4FromMat2d(out: mat4, matrix: mat2d): mat4;
export declare function mat2dFromMat4(out: mat2d, matrix: mat4): mat2d;
