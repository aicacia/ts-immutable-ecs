import { Record } from "immutable";
export class Parent extends Record({
    entity: null,
}, "ecs.hierarchy.Parent") {
    static toString() {
        return Parent.displayName;
    }
}
