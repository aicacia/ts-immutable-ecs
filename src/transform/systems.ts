import { mat2d, mat4 } from "gl-matrix";
import { Entity } from "../Entity";
import { Children, Parent } from "../hierarchy";
import type { World } from "../World";
import {
  GlobalTransform2D,
  GlobalTransform3D,
  Transform2D,
  Transform3D,
} from "./components";
import { changed, oneOf, without } from "../Query";

export function syncSimpleTransforms(world: World) {
  for (const [entity, transform, globalTransform] of world.query(
    Entity,
    Transform3D,
    GlobalTransform3D,
    without(Parent),
    without(Children)
  )) {
    world = world.setComponent(
      entity,
      GlobalTransform3D,
      globalTransform.set("matrix", transform.getMatrix(globalTransform.matrix))
    );
  }
  for (const [entity, transform, globalTransform] of world.query(
    Entity,
    Transform2D,
    GlobalTransform2D,
    without(Parent),
    without(Children)
  )) {
    world = world.setComponent(
      entity,
      GlobalTransform2D,
      globalTransform.set(
        "matrix",
        transform.getMatrix2D(globalTransform.matrix)
      )
    );
  }
  return world;
}

const MAT2D_0 = mat2d.create();
const MAT2D_1 = mat2d.create();
const MAT4_0 = mat4.create();
const MAT4_1 = mat4.create();

export function transformSystem(world: World) {
  for (const [
    entity,
    transform,
    children,
    transform2DChanged,
    transform3DChanged,
    childrenChanged,
    globalTransform,
  ] of world.query(
    Entity,
    oneOf(Transform2D, Transform3D),
    Children,
    changed(Transform2D),
    changed(Transform3D),
    changed(Children),
    oneOf(GlobalTransform2D, GlobalTransform3D),
    without(Parent)
  )) {
    if (transform2DChanged || transform3DChanged) {
      if (globalTransform.is3D()) {
        world = world.updateComponent(
          entity,
          GlobalTransform3D,
          (globalTransform) =>
            globalTransform.setMatrix(transform.getMatrix(mat4.create()))
        );
      } else {
        world = world.updateComponent(
          entity,
          GlobalTransform2D,
          (globalTransform) =>
            globalTransform.setMatrix(transform.getMatrix2D(mat2d.create()))
        );
      }
    }

    const parentChanged =
      transform2DChanged || transform3DChanged || childrenChanged;

    for (const child of children.children) {
      world = propagateRecursive(
        world,
        entity,
        globalTransform,
        child,
        parentChanged
      );
    }
  }

  return world;
}

function propagateRecursive(
  world: World,
  expectedParent: Entity,
  parentGlobalTransform: GlobalTransform2D | GlobalTransform3D,
  entity: Entity,
  parentChanged: boolean
) {
  const actualParent = world.getComponent(entity, Parent);

  if (!actualParent || actualParent.entity !== expectedParent) {
    throw new Error(
      "Malformed hierarchy. This probably means that your hierarchy has been improperly maintained, or contains a cycle"
    );
  }

  let globalTransform: GlobalTransform2D | GlobalTransform3D;
  const childTransformResult = world.queryOne(
    entity,
    oneOf(Transform2D, Transform3D),
    changed(Transform2D),
    changed(Transform3D),
    oneOf(GlobalTransform2D, GlobalTransform3D)
  );
  if (childTransformResult) {
    const [
      childTransform,
      child2DChanged,
      child3DChanged,
      childGlobalTransform,
    ] = childTransformResult;

    if (child2DChanged || child3DChanged || parentChanged) {
      if (childGlobalTransform.is3D()) {
        globalTransform = childGlobalTransform.setMatrix(
          mat4.mul(
            childGlobalTransform.matrix,
            parentGlobalTransform.getMatrix(MAT4_0),
            childTransform.getMatrix(MAT4_1)
          )
        );
        world = world.setComponent(entity, GlobalTransform3D, globalTransform);
      } else {
        globalTransform = childGlobalTransform.setMatrix(
          mat2d.mul(
            childGlobalTransform.matrix,
            parentGlobalTransform.getMatrix2D(MAT2D_0),
            childTransform.getMatrix2D(MAT2D_1)
          )
        );
        world = world.setComponent(entity, GlobalTransform2D, globalTransform);
      }
    } else {
      globalTransform = childGlobalTransform;
    }
  } else {
    return world;
  }

  const childChildrenResult = world.queryOne(
    entity,
    Children,
    changed(Children),
    Parent,
    oneOf(GlobalTransform2D, GlobalTransform3D)
  );
  if (childChildrenResult) {
    const [childChildren, childChildrenChanged] = childChildrenResult;

    const childChanged = childChildrenChanged || parentChanged;

    for (const child of childChildren.children) {
      world = propagateRecursive(
        world,
        entity,
        globalTransform,
        child,
        childChanged
      );
    }
  }

  return world;
}
