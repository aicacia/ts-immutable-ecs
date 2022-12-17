"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optional = exports.without = exports.changed = exports.oneOf = exports.CoreStage = exports.World = exports.ResourceManager = exports.ResourceClassManager = exports.EntityBuilder = exports.Entity = exports.parentUpdateSystem = exports.removeChildren = exports.hierarchyPlugin = exports.PreviousParent = exports.Parent = exports.Children = void 0;
var hierarchy_1 = require("./hierarchy");
Object.defineProperty(exports, "Children", { enumerable: true, get: function () { return hierarchy_1.Children; } });
Object.defineProperty(exports, "Parent", { enumerable: true, get: function () { return hierarchy_1.Parent; } });
Object.defineProperty(exports, "PreviousParent", { enumerable: true, get: function () { return hierarchy_1.PreviousParent; } });
Object.defineProperty(exports, "hierarchyPlugin", { enumerable: true, get: function () { return hierarchy_1.hierarchyPlugin; } });
Object.defineProperty(exports, "removeChildren", { enumerable: true, get: function () { return hierarchy_1.removeChildren; } });
Object.defineProperty(exports, "parentUpdateSystem", { enumerable: true, get: function () { return hierarchy_1.parentUpdateSystem; } });
var Entity_1 = require("./Entity");
Object.defineProperty(exports, "Entity", { enumerable: true, get: function () { return Entity_1.Entity; } });
var EntityBuilder_1 = require("./EntityBuilder");
Object.defineProperty(exports, "EntityBuilder", { enumerable: true, get: function () { return EntityBuilder_1.EntityBuilder; } });
var ResourceClassManager_1 = require("./ResourceClassManager");
Object.defineProperty(exports, "ResourceClassManager", { enumerable: true, get: function () { return ResourceClassManager_1.ResourceClassManager; } });
var ResourceManager_1 = require("./ResourceManager");
Object.defineProperty(exports, "ResourceManager", { enumerable: true, get: function () { return ResourceManager_1.ResourceManager; } });
var World_1 = require("./World");
Object.defineProperty(exports, "World", { enumerable: true, get: function () { return World_1.World; } });
Object.defineProperty(exports, "CoreStage", { enumerable: true, get: function () { return World_1.CoreStage; } });
var Query_1 = require("./Query");
Object.defineProperty(exports, "oneOf", { enumerable: true, get: function () { return Query_1.oneOf; } });
Object.defineProperty(exports, "changed", { enumerable: true, get: function () { return Query_1.changed; } });
Object.defineProperty(exports, "without", { enumerable: true, get: function () { return Query_1.without; } });
Object.defineProperty(exports, "optional", { enumerable: true, get: function () { return Query_1.optional; } });