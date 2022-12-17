import { Map, Record } from "immutable";
export class ResourceClassManager extends Record({
    resources: Map(),
    resourcesToDelete: Map(),
    resourcesToUpdate: Map(),
    changed: Map(),
    deleted: Map(),
}, "ecs.ResourceClassManager") {
    setResource(Resource, resource) {
        return this.set("resourcesToUpdate", this.resourcesToUpdate.set(Resource, resource));
    }
    addResource(resource) {
        return this.setResource(Object.getPrototypeOf(resource).constructor, resource);
    }
    updateResource(Resource, updateFn) {
        const resource = this.getResource(Resource);
        if (resource) {
            return this.set("resourcesToUpdate", this.resourcesToUpdate.set(Resource, updateFn(resource)));
        }
        else {
            return this;
        }
    }
    deleteResource(Resource) {
        const resource = this.getResource(Resource);
        if (resource) {
            return this.set("resourcesToDelete", this.resourcesToDelete.set(Resource, resource));
        }
        else {
            return this;
        }
    }
    getResource(Resource) {
        return this.resources.get(Resource);
    }
    hasResource(Resource) {
        return this.resources.has(Resource);
    }
    getChangedResource(Resource) {
        return this.changed.get(Resource);
    }
    changedResource(Resource) {
        return this.changed.has(Resource);
    }
    getDeletedResource(Resource) {
        return this.deleted.get(Resource);
    }
    deletedResource(Resource) {
        return this.deleted.has(Resource);
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
        for (const Resource of updated.resourcesToDelete.keys()) {
            updated = updated.set("resources", updated.resources.delete(Resource));
        }
        updated = updated.set("deleted", updated.resourcesToDelete);
        updated = updated.set("resourcesToDelete", updated.resourcesToDelete.clear());
        for (const [Resource, resource] of updated.resourcesToUpdate) {
            updated = updated.set("resources", updated.resources.set(Resource, resource));
        }
        updated = updated.set("changed", updated.resourcesToUpdate);
        updated = updated.set("resourcesToUpdate", updated.resourcesToUpdate.clear());
        return updated;
    }
}
