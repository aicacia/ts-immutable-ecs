import { Entity } from "./Entity";
import type { World } from "./World";
export declare class EntityBuilder {
    protected world: World;
    protected entity: Entity;
    constructor(world: World, entity: Entity);
    withComponent<C>(component: C): this;
    addComponent<C>(component: C): this;
    withChild(fn?: (builder: EntityBuilder) => EntityBuilder): this;
    addChild(entity: Entity): this;
    build(): [world: World, entity: Entity];
}
