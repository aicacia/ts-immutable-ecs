import { Entity } from "./Entity";
import { ResourceManager } from "./ResourceManager";
import { ResourceClassManager } from "./ResourceClassManager";
import type { IConstructor } from "./IConstructor";
import { List, Map, Record } from "immutable";
import { EntityBuilder } from "./EntityBuilder";
import { IQueryResult } from "./Query";
export declare enum CoreStage {
    First = 0,
    PreUpdate = 1,
    Update = 2,
    PostUpdate = 3,
    Last = 4
}
export type IWorldFn = (world: World) => World;
declare const World_base: Record.Factory<{
    entities: ResourceManager<Entity>;
    components: Map<Entity, ResourceClassManager<unknown>>;
    resources: ResourceClassManager<unknown>;
    systems: List<ResourceManager<IWorldFn>>;
    commands: List<List<IWorldFn>>;
}>;
export declare class World extends World_base {
    addPlugin(plugin: IWorldFn): this;
    addPlugins(...plugins: IWorldFn[]): this;
    addSystemAtStage(stage: CoreStage, system: IWorldFn): this;
    addSystem(system: IWorldFn): this;
    deleteSystemAtStage(stage: CoreStage, system: IWorldFn): this;
    deleteSystem(system: IWorldFn): this;
    addResource<R>(resource: R): this;
    setResource<R>(Resource: IConstructor<R>, resource: R): this;
    deleteResource<R>(Resource: IConstructor<R>): this;
    getResource<R>(Resource: IConstructor<R>): R | undefined;
    updateResource<R>(Resource: IConstructor<R>, updateFn: (resource: R) => R): this;
    addComponent<C>(entity: Entity, component: C): this;
    deleteComponent<C>(entity: Entity, Component: IConstructor<C>): this;
    getComponent<C>(entity: Entity, Component: IConstructor<C>): C | undefined;
    updateComponent<C>(entity: Entity, Component: IConstructor<C>, updateFn: (component: C) => C): this;
    setComponent<C>(entity: Entity, Component: IConstructor<C>, component: C): this;
    withEntity(fn: (builder: EntityBuilder) => EntityBuilder): World;
    addEntity(entity: Entity): this;
    deleteEntity(entity: Entity): this;
    runCommandAtStage(stage: CoreStage, command: IWorldFn): this;
    runCommand(command: IWorldFn): this;
    update(): this;
    maintain(): this;
    query<T extends Array<any>>(...query: T): Iterable<IQueryResult<T>>;
    queryOne<T extends Array<any>>(entity: Entity, ...query: T): IQueryResult<T> | undefined;
}
export {};
