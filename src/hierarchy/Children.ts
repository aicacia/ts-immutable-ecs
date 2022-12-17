import { OrderedSet, Record } from "immutable";
import type { Entity } from "../Entity";

export class Children extends Record(
  {
    children: OrderedSet<Entity>(),
  },
  "ecs.hierarchy.Children"
) {
  static toString() {
    return Children.displayName;
  }
}
