import { Record } from "immutable";
export class PreviousParent extends Record({
    entity: null,
}, "ecs.hierarchy.PreviousParent") {
    static toString() {
        return PreviousParent.displayName;
    }
}
