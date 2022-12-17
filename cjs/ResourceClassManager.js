"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceClassManager = void 0;
const immutable_1 = require("immutable");
class ResourceClassManager extends (0, immutable_1.Record)({
    resources: (0, immutable_1.Map)(),
    resourcesToDelete: (0, immutable_1.Map)(),
    resourcesToUpdate: (0, immutable_1.Map)(),
    changed: (0, immutable_1.Map)(),
    deleted: (0, immutable_1.Map)(),
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
exports.ResourceClassManager = ResourceClassManager;
