import type { Entity } from "../Entity";
import type { World } from "../World";
import { Children } from "./Children";
import { Parent } from "./Parent";

export const removeChildren = (entity: Entity) => (world: World) =>
  removeChildrenRecur(world, entity);

function removeChildrenRecur(world: World, entity: Entity) {
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
