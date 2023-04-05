"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalTransform3D = exports.GlobalTransform2D = exports.Transform3D = exports.Transform2D = void 0;
const gl_matrix_1 = require("gl-matrix");
const immutable_1 = require("immutable");
const math_1 = require("./math");
const MAT2D_0 = gl_matrix_1.mat2d.create();
const MAT4_0 = gl_matrix_1.mat4.create();
class Transform2D extends (0, immutable_1.Record)({
    position: gl_matrix_1.vec2.create(),
    scale: gl_matrix_1.vec2.fromValues(1, 1),
    rotation: 0,
}, "ecs.transform.Transform2D") {
    static toString() {
        return Transform2D.displayName;
    }
    is2D() {
        return true;
    }
    is3D() {
        return false;
    }
    getMatrix2D(out) {
        return (0, math_1.composeMat2d)(out, this.position, this.scale, this.rotation);
    }
    getMatrix(out) {
        return (0, math_1.mat4FromMat2d)(out, this.getMatrix2D(MAT2D_0));
    }
}
exports.Transform2D = Transform2D;
class Transform3D extends (0, immutable_1.Record)({
    position: gl_matrix_1.vec3.create(),
    scale: gl_matrix_1.vec3.fromValues(1, 1, 1),
    rotation: gl_matrix_1.quat.create(),
}, "ecs.transform.Transform3D") {
    static toString() {
        return Transform3D.displayName;
    }
    is2D() {
        return false;
    }
    is3D() {
        return true;
    }
    getMatrix2D(out) {
        return (0, math_1.mat2dFromMat4)(out, this.getMatrix(MAT4_0));
    }
    getMatrix(out) {
        return gl_matrix_1.mat4.fromRotationTranslationScale(out, this.rotation, this.position, this.scale);
    }
}
exports.Transform3D = Transform3D;
class GlobalTransform2D extends (0, immutable_1.Record)({
    matrix: gl_matrix_1.mat2d.create(),
}, "ecs.transform.GlobalTransform2D") {
    static toString() {
        return GlobalTransform2D.displayName;
    }
    is2D() {
        return true;
    }
    is3D() {
        return false;
    }
    setMatrix(matrix) {
        return this.set("matrix", matrix);
    }
    getMatrix2D(out) {
        return gl_matrix_1.mat2d.copy(out, this.matrix);
    }
    getMatrix(out) {
        return (0, math_1.mat4FromMat2d)(out, this.getMatrix2D(MAT2D_0));
    }
}
exports.GlobalTransform2D = GlobalTransform2D;
class GlobalTransform3D extends (0, immutable_1.Record)({
    matrix: gl_matrix_1.mat4.create(),
}, "ecs.transform.GlobalTransform3D") {
    static toString() {
        return GlobalTransform3D.displayName;
    }
    is2D() {
        return false;
    }
    is3D() {
        return true;
    }
    setMatrix(matrix) {
        return this.set("matrix", matrix);
    }
    getMatrix2D(out) {
        return (0, math_1.mat2dFromMat4)(out, this.matrix);
    }
    getMatrix(out) {
        return gl_matrix_1.mat4.copy(out, this.matrix);
    }
}
exports.GlobalTransform3D = GlobalTransform3D;
