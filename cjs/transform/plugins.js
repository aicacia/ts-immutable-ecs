"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPlugin = void 0;
const World_1 = require("../World");
const systems_1 = require("./systems");
const transformPlugin = () => (world) => world
    .addSystemAtStage(World_1.CoreStage.PreUpdate, systems_1.syncSimpleTransforms)
    .addSystemAtStage(World_1.CoreStage.PreUpdate, systems_1.transformSystem);
exports.transformPlugin = transformPlugin;
