import { OrderedSet, Record } from "immutable";

export class ResourceManager<T> extends Record(
  {
    resources: OrderedSet(),
    resourcesToDelete: OrderedSet(),
    resourcesToUpdate: OrderedSet(),
    changed: OrderedSet(),
    deleted: OrderedSet(),
  },
  "ecs.ResourceManager"
) {
  setResource(resource: T) {
    return this.set("resourcesToUpdate", this.resourcesToUpdate.add(resource));
  }
  addResource(resource: T) {
    return this.setResource(resource);
  }
  updateResource(resource: T, updateFn: (resource: T) => T) {
    return this.setResource(updateFn(resource));
  }
  deleteResource(resource: T) {
    if (this.resources.has(resource)) {
      return this.set(
        "resourcesToDelete",
        this.resourcesToDelete.add(resource)
      );
    } else {
      return this;
    }
  }
  getResource(resource: T) {
    return this.resources.has(resource) ? resource : undefined;
  }
  getChangedResource(resource: T) {
    return this.changed.has(resource) ? resource : undefined;
  }
  changedResource(resource: T) {
    return this.changed.has(resource);
  }
  getDeletedResource(resource: T) {
    return this.deleted.has(resource) ? resource : undefined;
  }
  deletedResource(resource: T) {
    return this.deleted.has(resource);
  }

  isEmpty() {
    return this.resources.size === 0;
  }
  keys() {
    return this.resources.keys() as IterableIterator<T>;
  }
  values() {
    return this.resources.values() as IterableIterator<T>;
  }
  entries() {
    return this.resources.entries() as IterableIterator<[T, T]>;
  }

  maintain() {
    let updated = this;
    for (const resource of updated.resourcesToDelete) {
      updated = updated.set("resources", updated.resources.delete(resource));
    }
    updated = updated.set("deleted", updated.resourcesToDelete);
    updated = updated.set(
      "resourcesToDelete",
      updated.resourcesToDelete.clear()
    );
    for (const resource of updated.resourcesToUpdate) {
      updated = updated.set("resources", updated.resources.add(resource));
    }
    updated = updated.set("changed", updated.resourcesToUpdate);
    updated = updated.set(
      "resourcesToUpdate",
      updated.resourcesToUpdate.clear()
    );
    return updated;
  }
}
