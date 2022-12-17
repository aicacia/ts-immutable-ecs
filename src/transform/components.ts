import { mat2d, mat4, quat, vec2, vec3 } from "gl-matrix";
import { Record } from "immutable";
import { composeMat2d, mat4FromMat2d, mat2dFromMat4 } from "./math";

const MAT2D_0 = mat2d.create();
const MAT4_0 = mat4.create();

export class Transform2D extends Record(
  {
    position: vec2.create(),
    scale: vec2.fromValues(1, 1),
    rotation: 0,
  },
  "ecs.transform.Transform2D"
) {
  static toString() {
    return Transform2D.displayName;
  }

  is2D(): this is Transform2D {
    return true;
  }
  is3D(): this is never {
    return false;
  }
  getMatrix2D(out: mat2d) {
    return composeMat2d(out, this.position, this.scale, this.rotation);
  }
  getMatrix(out: mat4) {
    return mat4FromMat2d(out, this.getMatrix2D(MAT2D_0));
  }
}

export class Transform3D extends Record(
  {
    position: vec3.create(),
    scale: vec3.fromValues(1, 1, 1),
    rotation: quat.create(),
  },
  "ecs.transform.Transform3D"
) {
  static toString() {
    return Transform3D.displayName;
  }

  is2D(): this is never {
    return false;
  }
  is3D(): this is Transform3D {
    return true;
  }
  getMatrix2D(out: mat2d) {
    return mat2dFromMat4(out, this.getMatrix(MAT4_0));
  }
  getMatrix(out: mat4) {
    return mat4.fromRotationTranslationScale(
      out,
      this.rotation,
      this.position,
      this.scale
    );
  }
}

export class GlobalTransform2D extends Record(
  {
    matrix: mat2d.create(),
  },
  "ecs.transform.GlobalTransform2D"
) {
  static toString() {
    return GlobalTransform2D.displayName;
  }

  is2D(): this is GlobalTransform2D {
    return true;
  }
  is3D(): this is never {
    return false;
  }
  setMatrix(matrix: mat2d) {
    return this.set("matrix", matrix);
  }
  getMatrix2D(out: mat2d) {
    return mat2d.copy(out, this.matrix);
  }
  getMatrix(out: mat4) {
    return mat4FromMat2d(out, this.getMatrix2D(MAT2D_0));
  }
}

export class GlobalTransform3D extends Record(
  {
    matrix: mat4.create(),
  },
  "ecs.transform.GlobalTransform3D"
) {
  static toString() {
    return GlobalTransform3D.displayName;
  }

  is2D(): this is never {
    return false;
  }
  is3D(): this is GlobalTransform3D {
    return true;
  }
  setMatrix(matrix: mat4) {
    return this.set("matrix", matrix);
  }
  getMatrix2D(out: mat2d) {
    return mat2dFromMat4(out, this.matrix);
  }
  getMatrix(out: mat4) {
    return mat4.copy(out, this.matrix);
  }
}
