import { OrderedSet, Record } from "immutable";
import type { Entity } from "../Entity";
declare const Children_base: Record.Factory<{
    children: OrderedSet<Entity>;
}>;
export declare class Children extends Children_base {
    static toString(): string;
}
export {};
