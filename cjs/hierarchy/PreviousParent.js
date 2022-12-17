"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviousParent = void 0;
const immutable_1 = require("immutable");
class PreviousParent extends (0, immutable_1.Record)({
    entity: null,
}, "ecs.hierarchy.PreviousParent") {
    static toString() {
        return PreviousParent.displayName;
    }
}
exports.PreviousParent = PreviousParent;
