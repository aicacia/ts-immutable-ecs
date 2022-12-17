"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSystem = exports.syncSimpleTransforms = void 0;
const gl_matrix_1 = require("gl-matrix");
const Entity_1 = require("../Entity");
const hierarchy_1 = require("../hierarchy");
const components_1 = require("./components");
const Query_1 = require("../Query");
const syncSimpleTransforms = (world) => {
    for (const [entity, transform, globalTransform] of world.query(Entity_1.Entity, components_1.LocalTransform, components_1.GlobalTransform, (0, Query_1.without)(hierarchy_1.Parent), (0, Query_1.without)(hierarchy_1.Children))) {
        world = world.setComponent(entity, components_1.GlobalTransform, globalTransform.set("matrix", transform.getMatrix(globalTransform.matrix)));
    }
    return world;
};
exports.syncSimpleTransforms = syncSimpleTransforms;
const transformSystem = (world) => {
    for (const [entity, transform, children, transformChanged, childrenChanged, globalTransform,] of world.query(Entity_1.Entity, components_1.LocalTransform, hierarchy_1.Children, (0, Query_1.changed)(components_1.LocalTransform), (0, Query_1.changed)(hierarchy_1.Children), components_1.GlobalTransform, (0, Query_1.without)(hierarchy_1.Parent))) {
        if (transformChanged) {
            world = world.updateComponent(entity, components_1.GlobalTransform, (globalTransform) => globalTransform.setMatrix(transform.getMatrix(gl_matrix_1.mat4.create())));
        }
        const parentChanged = transformChanged || childrenChanged;
        for (const child of children.children) {
            world = propagateRecursive(world, entity, globalTransform, child, parentChanged);
        }
    }
    return world;
};
exports.transformSystem = transformSystem;
function propagateRecursive(world, expectedParent, parentGlobalTransform, entity, parentChanged) {
    const actualParent = world.getComponent(entity, hierarchy_1.Parent);
    if (!actualParent || actualParent.entity !== expectedParent) {
        throw new Error("Malformed hierarchy. This probably means that your hierarchy has been improperly maintained, or contains a cycle");
    }
    let globalTransform;
    const childTransformResult = world.queryOne(entity, components_1.LocalTransform, (0, Query_1.changed)(components_1.LocalTransform), components_1.GlobalTransform);
    if (childTransformResult) {
        const [childTransform, childChanged, childGlobalTransform] = childTransformResult;
        if (childChanged || parentChanged) {
            globalTransform = childGlobalTransform.setMatrix(gl_matrix_1.mat4.mul(childGlobalTransform.matrix, parentGlobalTransform.matrix, childTransform.getMatrix(childGlobalTransform.matrix)));
            world = world.setComponent(entity, components_1.GlobalTransform, globalTransform);
        }
        else {
            globalTransform = childGlobalTransform;
        }
    }
    else {
        return world;
    }
    const childChildrenResult = world.queryOne(entity, hierarchy_1.Children, (0, Query_1.changed)(hierarchy_1.Children), hierarchy_1.Parent, components_1.GlobalTransform);
    if (childChildrenResult) {
        const [childChildren, childChildrenChanged] = childChildrenResult;
        const childChanged = childChildrenChanged || parentChanged;
        for (const child of childChildren.children) {
            world = propagateRecursive(world, entity, globalTransform, child, childChanged);
        }
    }
    return world;
}
