"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const immutable_1 = require("immutable");
class Parent extends (0, immutable_1.Record)({
    entity: null,
}, "ecs.hierarchy.Parent") {
    static toString() {
        return Parent.displayName;
    }
}
exports.Parent = Parent;
