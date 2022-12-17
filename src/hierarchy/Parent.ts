import { Record } from "immutable";
import type { Entity } from "../Entity";

export class Parent extends Record(
  {
    entity: null as unknown as Entity,
  },
  "ecs.hierarchy.Parent"
) {
  static toString() {
    return Parent.displayName;
  }
}
