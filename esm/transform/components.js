import { mat4, quat, vec3 } from "gl-matrix";
import { Record } from "immutable";
export class LocalTransform extends Record({
    position: vec3.create(),
    scale: vec3.fromValues(1, 1, 1),
    rotation: quat.create(),
}, "ecs.transform.LocalTransform") {
    static toString() {
        return LocalTransform.displayName;
    }
    getMatrix(out) {
        return mat4.fromRotationTranslationScale(out, this.rotation, this.position, this.scale);
    }
}
export class GlobalTransform extends Record({
    matrix: mat4.create(),
}, "ecs.transform.GlobalTransform") {
    static fromLocalTransform(transform) {
        return new GlobalTransform({
            matrix: transform.getMatrix(mat4.create()),
        });
    }
    static toString() {
        return GlobalTransform.displayName;
    }
    setMatrix(matrix) {
        return this.set("matrix", matrix);
    }
}
