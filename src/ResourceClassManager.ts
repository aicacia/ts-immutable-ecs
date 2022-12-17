import { Map, Record } from "immutable";
import type { IConstructor } from "./IConstructor";

export class ResourceClassManager<T> extends Record(
  {
    resources: Map<IConstructor<unknown>, unknown>(),
    resourcesToDelete: Map<IConstructor<unknown>, unknown>(),
    resourcesToUpdate: Map<IConstructor<unknown>, unknown>(),
    changed: Map<IConstructor<unknown>, unknown>(),
    deleted: Map<IConstructor<unknown>, unknown>(),
  },
  "ecs.ResourceClassManager"
) {
  setResource(Resource: IConstructor<T>, resource: T) {
    return this.set(
      "resourcesToUpdate",
      this.resourcesToUpdate.set(Resource, resource)
    );
  }
  addResource(resource: T) {
    return this.setResource(
      Object.getPrototypeOf(resource).constructor,
      resource
    );
  }
  updateResource(Resource: IConstructor<T>, updateFn: (resource: T) => T) {
    const resource = this.getResource(Resource);
    if (resource) {
      return this.set(
        "resourcesToUpdate",
        this.resourcesToUpdate.set(Resource, updateFn(resource))
      );
    } else {
      return this;
    }
  }
  deleteResource(Resource: IConstructor<T>) {
    const resource = this.getResource(Resource);
    if (resource) {
      return this.set(
        "resourcesToDelete",
        this.resourcesToDelete.set(Resource, resource)
      );
    } else {
      return this;
    }
  }
  getResource(Resource: IConstructor<T>): T | undefined {
    return this.resources.get(Resource) as T;
  }
  hasResource(Resource: IConstructor<T>) {
    return this.resources.has(Resource);
  }
  getChangedResource(Resource: IConstructor<T>): T | undefined {
    return this.changed.get(Resource) as T;
  }
  changedResource(Resource: IConstructor<T>) {
    return this.changed.has(Resource);
  }
  getDeletedResource(Resource: IConstructor<T>): T | undefined {
    return this.deleted.get(Resource) as T;
  }
  deletedResource(Resource: IConstructor<T>) {
    return this.deleted.has(Resource);
  }

  isEmpty() {
    return this.resources.size === 0;
  }
  keys() {
    return this.resources.keys() as IterableIterator<IConstructor<T>>;
  }
  values() {
    return this.resources.values() as IterableIterator<T>;
  }
  entries() {
    return this.resources.entries() as IterableIterator<[IConstructor<T>, T]>;
  }

  maintain() {
    let updated = this;
    for (const Resource of updated.resourcesToDelete.keys()) {
      updated = updated.set("resources", updated.resources.delete(Resource));
    }
    updated = updated.set("deleted", updated.resourcesToDelete);
    updated = updated.set(
      "resourcesToDelete",
      updated.resourcesToDelete.clear()
    );
    for (const [Resource, resource] of updated.resourcesToUpdate) {
      updated = updated.set(
        "resources",
        updated.resources.set(Resource, resource)
      );
    }
    updated = updated.set("changed", updated.resourcesToUpdate);
    updated = updated.set(
      "resourcesToUpdate",
      updated.resourcesToUpdate.clear()
    );
    return updated;
  }
}
