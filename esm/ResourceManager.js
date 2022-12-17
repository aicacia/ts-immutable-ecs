import { OrderedSet, Record } from "immutable";
export class ResourceManager extends Record({
    resources: OrderedSet(),
    resourcesToDelete: OrderedSet(),
    resourcesToUpdate: OrderedSet(),
    changed: OrderedSet(),
    deleted: OrderedSet(),
}, "ecs.ResourceManager") {
    setResource(resource) {
        return this.set("resourcesToUpdate", this.resourcesToUpdate.add(resource));
    }
    addResource(resource) {
        return this.setResource(resource);
    }
    updateResource(resource, updateFn) {
        return this.setResource(updateFn(resource));
    }
    deleteResource(resource) {
        if (this.resources.has(resource)) {
            return this.set("resourcesToDelete", this.resourcesToDelete.add(resource));
        }
        else {
            return this;
        }
    }
    getResource(resource) {
        return this.resources.has(resource) ? resource : undefined;
    }
    getChangedResource(resource) {
        return this.changed.has(resource) ? resource : undefined;
    }
    changedResource(resource) {
        return this.changed.has(resource);
    }
    getDeletedResource(resource) {
        return this.deleted.has(resource) ? resource : undefined;
    }
    deletedResource(resource) {
        return this.deleted.has(resource);
    }
    isEmpty() {
        return this.resources.size === 0;
    }
    keys() {
        return this.resources.keys();
    }
    values() {
        return this.resources.values();
    }
    entries() {
        return this.resources.entries();
    }
    maintain() {
        let updated = this;
        for (const resource of updated.resourcesToDelete) {
            updated = updated.set("resources", updated.resources.delete(resource));
        }
        updated = updated.set("deleted", updated.resourcesToDelete);
        updated = updated.set("resourcesToDelete", updated.resourcesToDelete.clear());
        for (const resource of updated.resourcesToUpdate) {
            updated = updated.set("resources", updated.resources.add(resource));
        }
        updated = updated.set("changed", updated.resourcesToUpdate);
        updated = updated.set("resourcesToUpdate", updated.resourcesToUpdate.clear());
        return updated;
    }
}
