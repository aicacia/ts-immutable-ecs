"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hierarchyPlugin = void 0;
const World_1 = require("../World");
const parentUpdateSystem_1 = require("./parentUpdateSystem");
const hierarchyPlugin = () => (world) => world
    .runCommandAtStage(World_1.CoreStage.First, parentUpdateSystem_1.parentUpdateSystem)
    .addSystemAtStage(World_1.CoreStage.PostUpdate, parentUpdateSystem_1.parentUpdateSystem);
exports.hierarchyPlugin = hierarchyPlugin;
