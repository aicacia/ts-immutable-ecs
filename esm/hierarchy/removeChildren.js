import { Children } from "./Children";
import { Parent } from "./Parent";
export const removeChildren = (entity) => (world) => removeChildrenRecur(world, entity);
function removeChildrenRecur(world, entity) {
    const children = world.getComponent(entity, Children);
    if (children) {
        for (const child of children.children) {
            world = removeChildrenRecur(world, child);
            world = world.deleteComponent(child, Parent);
        }
        world = world.deleteComponent(entity, Children);
    }
    return world;
}
