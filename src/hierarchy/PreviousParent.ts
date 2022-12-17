import { Record } from "immutable";
import type { Entity } from "../Entity";

export class PreviousParent extends Record(
  {
    entity: null as unknown as Entity,
  },
  "ecs.hierarchy.PreviousParent"
) {
  static toString() {
    return PreviousParent.displayName;
  }
}
