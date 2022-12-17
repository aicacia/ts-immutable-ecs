"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSystem = exports.transformPlugin = exports.GlobalTransform = exports.LocalTransform = void 0;
var components_1 = require("./components");
Object.defineProperty(exports, "LocalTransform", { enumerable: true, get: function () { return components_1.LocalTransform; } });
Object.defineProperty(exports, "GlobalTransform", { enumerable: true, get: function () { return components_1.GlobalTransform; } });
var plugins_1 = require("./plugins");
Object.defineProperty(exports, "transformPlugin", { enumerable: true, get: function () { return plugins_1.transformPlugin; } });
var systems_1 = require("./systems");
Object.defineProperty(exports, "transformSystem", { enumerable: true, get: function () { return systems_1.transformSystem; } });