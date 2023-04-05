import { Map, Record } from "immutable";
import type { IConstructor } from "./IConstructor";
declare const ResourceClassManager_base: Record.Factory<{
    resources: Map<IConstructor<unknown>, unknown>;
    resourcesToDelete: Map<IConstructor<unknown>, unknown>;
    resourcesToUpdate: Map<IConstructor<unknown>, unknown>;
    changed: Map<IConstructor<unknown>, unknown>;
    deleted: Map<IConstructor<unknown>, unknown>;
}>;
export declare class ResourceClassManager<T> extends ResourceClassManager_base {
    setResource(Resource: IConstructor<T>, resource: T): this;
    addResource(resource: T): this;
    updateResource(Resource: IConstructor<T>, updateFn: (resource: T) => T): this;
    deleteResource(Resource: IConstructor<T>): this;
    getResource(Resource: IConstructor<T>): T | undefined;
    hasResource(Resource: IConstructor<T>): boolean;
    getChangedResource(Resource: IConstructor<T>): T | undefined;
    changedResource(Resource: IConstructor<T>): boolean;
    getDeletedResource(Resource: IConstructor<T>): T | undefined;
    deletedResource(Resource: IConstructor<T>): boolean;
    isEmpty(): boolean;
    keys(): IterableIterator<IConstructor<T>>;
    values(): IterableIterator<T>;
    entries(): IterableIterator<[IConstructor<T>, T]>;
    maintain(): this;
}
export {};
