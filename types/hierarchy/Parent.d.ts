import { Record } from "immutable";
import type { Entity } from "../Entity";
declare const Parent_base: Record.Factory<{
    entity: Entity;
}>;
export declare class Parent extends Parent_base {
    static toString(): string;
}
export {};
