"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runQuery = exports.oneOf = exports.optional = exports.without = exports.deleted = exports.changed = exports.isOneOfQuery = exports.isOptionalQuery = exports.isWithoutQuery = exports.isDeletedQuery = exports.isChangedQuery = void 0;
const Entity_1 = require("./Entity");
function isChangedQuery(value) {
    return "changed" in value;
}
exports.isChangedQuery = isChangedQuery;
function isDeletedQuery(value) {
    return "deleted" in value;
}
exports.isDeletedQuery = isDeletedQuery;
function isWithoutQuery(value) {
    return "without" in value;
}
exports.isWithoutQuery = isWithoutQuery;
function isOptionalQuery(value) {
    return "optional" in value;
}
exports.isOptionalQuery = isOptionalQuery;
function isOneOfQuery(value) {
    return "oneOf" in value;
}
exports.isOneOfQuery = isOneOfQuery;
function changed(changed) {
    return { changed };
}
exports.changed = changed;
function deleted(deleted) {
    return { deleted };
}
exports.deleted = deleted;
function without(without) {
    return { without };
}
exports.without = without;
function optional(optional) {
    return { optional };
}
exports.optional = optional;
function oneOf(...oneOf) {
    return { oneOf };
}
exports.oneOf = oneOf;
function runQuery(entity, components, query) {
    return runQueryInternal(entity, components, query);
}
exports.runQuery = runQuery;
function runQueryInternal(entity, components, query) {
    if (Array.isArray(query)) {
        const result = [];
        for (const q of query) {
            const r = runQueryInternal(entity, components, q);
            if (r !== undefined) {
                result.push(r);
            }
            else {
                return undefined;
            }
        }
        return result;
    }
    else if (isChangedQuery(query)) {
        return components.changedResource(query.changed);
    }
    else if (isDeletedQuery(query)) {
        return components.deletedResource(query.deleted);
    }
    else if (isWithoutQuery(query)) {
        if (components.hasResource(query.without)) {
            return undefined;
        }
        else {
            return null;
        }
    }
    else if (isOptionalQuery(query)) {
        return components.getResource(query.optional);
    }
    else if (isOneOfQuery(query)) {
        for (const subQuery of query.oneOf) {
            const subResult = runQueryInternal(entity, components, subQuery);
            if (subResult !== undefined) {
                return subResult;
            }
        }
        return undefined;
    }
    else if (query === Entity_1.Entity) {
        return entity;
    }
    else {
        return components.getResource(query);
    }
}
