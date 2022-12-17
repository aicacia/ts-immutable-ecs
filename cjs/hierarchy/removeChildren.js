"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeChildren = void 0;
const Children_1 = require("./Children");
const Parent_1 = require("./Parent");
const removeChildren = (entity) => (world) => removeChildrenRecur(world, entity);
exports.removeChildren = removeChildren;
function removeChildrenRecur(world, entity) {
    const children = world.getComponent(entity, Children_1.Children);
    if (children) {
        for (const child of children.children) {
            world = removeChildrenRecur(world, child);
            world = world.deleteComponent(child, Parent_1.Parent);
        }
        world = world.deleteComponent(entity, Children_1.Children);
    }
    return world;
}
