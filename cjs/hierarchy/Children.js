"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Children = void 0;
const immutable_1 = require("immutable");
class Children extends (0, immutable_1.Record)({
    children: (0, immutable_1.OrderedSet)(),
}, "ecs.hierarchy.Children") {
    static toString() {
        return Children.displayName;
    }
}
exports.Children = Children;
