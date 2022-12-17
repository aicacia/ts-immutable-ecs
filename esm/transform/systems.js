import { mat4 } from "gl-matrix";
import { Entity } from "../Entity";
import { Children, Parent } from "../hierarchy";
import { GlobalTransform, LocalTransform } from "./components";
import { changed, without } from "../Query";
export const syncSimpleTransforms = (world) => {
    for (const [entity, transform, globalTransform] of world.query(Entity, LocalTransform, GlobalTransform, without(Parent), without(Children))) {
        world = world.setComponent(entity, GlobalTransform, globalTransform.set("matrix", transform.getMatrix(globalTransform.matrix)));
    }
    return world;
};
export const transformSystem = (world) => {
    for (const [entity, transform, children, transformChanged, childrenChanged, globalTransform,] of world.query(Entity, LocalTransform, Children, changed(LocalTransform), changed(Children), GlobalTransform, without(Parent))) {
        if (transformChanged) {
            world = world.updateComponent(entity, GlobalTransform, (globalTransform) => globalTransform.setMatrix(transform.getMatrix(mat4.create())));
        }
        const parentChanged = transformChanged || childrenChanged;
        for (const child of children.children) {
            world = propagateRecursive(world, entity, globalTransform, child, parentChanged);
        }
    }
    return world;
};
function propagateRecursive(world, expectedParent, parentGlobalTransform, entity, parentChanged) {
    const actualParent = world.getComponent(entity, Parent);
    if (!actualParent || actualParent.entity !== expectedParent) {
        throw new Error("Malformed hierarchy. This probably means that your hierarchy has been improperly maintained, or contains a cycle");
    }
    let globalTransform;
    const childTransformResult = world.queryOne(entity, LocalTransform, changed(LocalTransform), GlobalTransform);
    if (childTransformResult) {
        const [childTransform, childChanged, childGlobalTransform] = childTransformResult;
        if (childChanged || parentChanged) {
            globalTransform = childGlobalTransform.setMatrix(mat4.mul(childGlobalTransform.matrix, parentGlobalTransform.matrix, childTransform.getMatrix(childGlobalTransform.matrix)));
            world = world.setComponent(entity, GlobalTransform, globalTransform);
        }
        else {
            globalTransform = childGlobalTransform;
        }
    }
    else {
        return world;
    }
    const childChildrenResult = world.queryOne(entity, Children, changed(Children), Parent, GlobalTransform);
    if (childChildrenResult) {
        const [childChildren, childChildrenChanged] = childChildrenResult;
        const childChanged = childChildrenChanged || parentChanged;
        for (const child of childChildren.children) {
            world = propagateRecursive(world, entity, globalTransform, child, childChanged);
        }
    }
    return world;
}
