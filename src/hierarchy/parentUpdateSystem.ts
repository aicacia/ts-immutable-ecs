import { OrderedSet } from "immutable";
import { Entity } from "../Entity";
import type { World } from "../World";
import { Children } from "./Children";
import { Parent } from "./Parent";
import { PreviousParent } from "./PreviousParent";
import { optional, without } from "../Query";

export function parentUpdateSystem(world: World) {
  for (const [entity, previousParent] of world.query(
    Entity,
    PreviousParent,
    without(Parent)
  )) {
    world = world.updateComponent(
      previousParent.entity,
      Children,
      (previousChildren) =>
        previousChildren.set(
          "children",
          previousChildren.children.delete(entity)
        )
    );
    world = world.deleteComponent(entity, PreviousParent);
  }

  const newChildren: Map<Entity, Entity[]> = new Map();

  for (const [entity, parent, previousParent] of world.query(
    Entity,
    Parent,
    optional(PreviousParent)
  )) {
    const parentEntity = parent.entity;

    if (previousParent) {
      const previousParentEntity = previousParent.entity;

      if (previousParentEntity === parentEntity) {
        continue;
      }

      world = world.updateComponent(
        previousParentEntity,
        Children,
        (previousChildren) =>
          previousChildren.set(
            "children",
            previousChildren.children.delete(entity)
          )
      );

      world = world.updateComponent(entity, PreviousParent, (previousParent) =>
        previousParent.set("entity", parentEntity)
      );
    } else {
      world = world.addComponent(
        entity,
        new PreviousParent({ entity: parentEntity })
      );
    }

    const parentChildren = world.getComponent(parentEntity, Children);
    if (parentChildren) {
      if (!parentChildren.children.includes(entity)) {
        world = world.updateComponent(
          parentEntity,
          Children,
          (parentChildren) =>
            parentChildren.set("children", parentChildren.children.add(entity))
        );
      }
    } else {
      const children = newChildren.get(parentEntity);
      if (children) {
        children.push(entity);
      } else {
        newChildren.set(parentEntity, [entity]);
      }
    }
  }

  for (const [parent, children] of newChildren) {
    world = world.addComponent(
      parent,
      new Children({ children: OrderedSet(children) })
    );
  }

  return world;
}
