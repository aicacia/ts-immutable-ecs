"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSystem = exports.syncSimpleTransforms = void 0;
const gl_matrix_1 = require("gl-matrix");
const Entity_1 = require("../Entity");
const hierarchy_1 = require("../hierarchy");
const components_1 = require("./components");
const Query_1 = require("../Query");
function syncSimpleTransforms(world) {
    for (const [entity, transform, globalTransform] of world.query(Entity_1.Entity, components_1.Transform3D, components_1.GlobalTransform3D, (0, Query_1.without)(hierarchy_1.Parent), (0, Query_1.without)(hierarchy_1.Children))) {
        world = world.setComponent(entity, components_1.GlobalTransform3D, globalTransform.set("matrix", transform.getMatrix(globalTransform.matrix)));
    }
    for (const [entity, transform, globalTransform] of world.query(Entity_1.Entity, components_1.Transform2D, components_1.GlobalTransform2D, (0, Query_1.without)(hierarchy_1.Parent), (0, Query_1.without)(hierarchy_1.Children))) {
        world = world.setComponent(entity, components_1.GlobalTransform2D, globalTransform.set("matrix", transform.getMatrix2D(globalTransform.matrix)));
    }
    return world;
}
exports.syncSimpleTransforms = syncSimpleTransforms;
const MAT2D_0 = gl_matrix_1.mat2d.create();
const MAT2D_1 = gl_matrix_1.mat2d.create();
const MAT4_0 = gl_matrix_1.mat4.create();
const MAT4_1 = gl_matrix_1.mat4.create();
function transformSystem(world) {
    for (const [entity, transform, children, transform2DChanged, transform3DChanged, childrenChanged, globalTransform,] of world.query(Entity_1.Entity, (0, Query_1.oneOf)(components_1.Transform2D, components_1.Transform3D), hierarchy_1.Children, (0, Query_1.changed)(components_1.Transform2D), (0, Query_1.changed)(components_1.Transform3D), (0, Query_1.changed)(hierarchy_1.Children), (0, Query_1.oneOf)(components_1.GlobalTransform2D, components_1.GlobalTransform3D), (0, Query_1.without)(hierarchy_1.Parent))) {
        if (transform2DChanged || transform3DChanged) {
            if (globalTransform.is3D()) {
                world = world.updateComponent(entity, components_1.GlobalTransform3D, (globalTransform) => globalTransform.setMatrix(transform.getMatrix(gl_matrix_1.mat4.create())));
            }
            else {
                world = world.updateComponent(entity, components_1.GlobalTransform2D, (globalTransform) => globalTransform.setMatrix(transform.getMatrix2D(gl_matrix_1.mat2d.create())));
            }
        }
        const parentChanged = transform2DChanged || transform3DChanged || childrenChanged;
        for (const child of children.children) {
            world = propagateRecursive(world, entity, globalTransform, child, parentChanged);
        }
    }
    return world;
}
exports.transformSystem = transformSystem;
function propagateRecursive(world, expectedParent, parentGlobalTransform, entity, parentChanged) {
    const actualParent = world.getComponent(entity, hierarchy_1.Parent);
    if (!actualParent || actualParent.entity !== expectedParent) {
        throw new Error("Malformed hierarchy. This probably means that your hierarchy has been improperly maintained, or contains a cycle");
    }
    let globalTransform;
    const childTransformResult = world.queryOne(entity, (0, Query_1.oneOf)(components_1.Transform2D, components_1.Transform3D), (0, Query_1.changed)(components_1.Transform2D), (0, Query_1.changed)(components_1.Transform3D), (0, Query_1.oneOf)(components_1.GlobalTransform2D, components_1.GlobalTransform3D));
    if (childTransformResult) {
        const [childTransform, child2DChanged, child3DChanged, childGlobalTransform,] = childTransformResult;
        if (child2DChanged || child3DChanged || parentChanged) {
            if (childGlobalTransform.is3D()) {
                globalTransform = childGlobalTransform.setMatrix(gl_matrix_1.mat4.mul(childGlobalTransform.matrix, parentGlobalTransform.getMatrix(MAT4_0), childTransform.getMatrix(MAT4_1)));
                world = world.setComponent(entity, components_1.GlobalTransform3D, globalTransform);
            }
            else {
                globalTransform = childGlobalTransform.setMatrix(gl_matrix_1.mat2d.mul(childGlobalTransform.matrix, parentGlobalTransform.getMatrix2D(MAT2D_0), childTransform.getMatrix2D(MAT2D_1)));
                world = world.setComponent(entity, components_1.GlobalTransform2D, globalTransform);
            }
        }
        else {
            globalTransform = childGlobalTransform;
        }
    }
    else {
        return world;
    }
    const childChildrenResult = world.queryOne(entity, hierarchy_1.Children, (0, Query_1.changed)(hierarchy_1.Children), hierarchy_1.Parent, (0, Query_1.oneOf)(components_1.GlobalTransform2D, components_1.GlobalTransform3D));
    if (childChildrenResult) {
        const [childChildren, childChildrenChanged] = childChildrenResult;
        const childChanged = childChildrenChanged || parentChanged;
        for (const child of childChildren.children) {
            world = propagateRecursive(world, entity, globalTransform, child, childChanged);
        }
    }
    return world;
}
