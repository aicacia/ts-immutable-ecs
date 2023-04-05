import { OrderedSet, Record } from "immutable";
declare const ResourceManager_base: Record.Factory<{
    resources: OrderedSet<unknown>;
    resourcesToDelete: OrderedSet<unknown>;
    resourcesToUpdate: OrderedSet<unknown>;
    changed: OrderedSet<unknown>;
    deleted: OrderedSet<unknown>;
}>;
export declare class ResourceManager<T> extends ResourceManager_base {
    setResource(resource: T): this;
    addResource(resource: T): this;
    updateResource(resource: T, updateFn: (resource: T) => T): this;
    deleteResource(resource: T): this;
    getResource(resource: T): T | undefined;
    getChangedResource(resource: T): T | undefined;
    changedResource(resource: T): boolean;
    getDeletedResource(resource: T): T | undefined;
    deletedResource(resource: T): boolean;
    isEmpty(): boolean;
    keys(): IterableIterator<T>;
    values(): IterableIterator<T>;
    entries(): IterableIterator<[T, T]>;
    maintain(): this;
}
export {};
