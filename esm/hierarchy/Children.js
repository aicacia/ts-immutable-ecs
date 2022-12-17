import { OrderedSet, Record } from "immutable";
export class Children extends Record({
    children: OrderedSet(),
}, "ecs.hierarchy.Children") {
    static toString() {
        return Children.displayName;
    }
}
