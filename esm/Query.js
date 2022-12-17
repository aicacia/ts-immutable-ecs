import { Entity } from "./Entity";
export function isChangedQuery(value) {
    return "changed" in value;
}
export function isDeletedQuery(value) {
    return "deleted" in value;
}
export function isWithoutQuery(value) {
    return "without" in value;
}
export function isOptionalQuery(value) {
    return "optional" in value;
}
export function isOneOfQuery(value) {
    return "oneOf" in value;
}
export function changed(changed) {
    return { changed };
}
export function deleted(deleted) {
    return { deleted };
}
export function without(without) {
    return { without };
}
export function optional(optional) {
    return { optional };
}
export function oneOf(oneOf) {
    return { oneOf };
}
export function runQuery(entity, components, query) {
    return runQueryInternal(entity, components, query);
}
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
    else if (query === Entity) {
        return entity;
    }
    else {
        return components.getResource(query);
    }
}
