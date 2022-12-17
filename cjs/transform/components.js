"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalTransform = exports.LocalTransform = void 0;
const gl_matrix_1 = require("gl-matrix");
const immutable_1 = require("immutable");
class LocalTransform extends (0, immutable_1.Record)({
    position: gl_matrix_1.vec3.create(),
    scale: gl_matrix_1.vec3.fromValues(1, 1, 1),
    rotation: gl_matrix_1.quat.create(),
}, "ecs.transform.LocalTransform") {
    static toString() {
        return LocalTransform.displayName;
    }
    getMatrix(out) {
        return gl_matrix_1.mat4.fromRotationTranslationScale(out, this.rotation, this.position, this.scale);
    }
}
exports.LocalTransform = LocalTransform;
class GlobalTransform extends (0, immutable_1.Record)({
    matrix: gl_matrix_1.mat4.create(),
}, "ecs.transform.GlobalTransform") {
    static fromLocalTransform(transform) {
        return new GlobalTransform({
            matrix: transform.getMatrix(gl_matrix_1.mat4.create()),
        });
    }
    static toString() {
        return GlobalTransform.displayName;
    }
    setMatrix(matrix) {
        return this.set("matrix", matrix);
    }
}
exports.GlobalTransform = GlobalTransform;
