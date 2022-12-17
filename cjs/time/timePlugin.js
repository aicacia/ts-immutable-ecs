"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timePlugin = void 0;
const World_1 = require("../World");
const Time_1 = require("./Time");
const timeSystem_1 = require("./timeSystem");
const timePlugin = () => (world) => world.addResource(new Time_1.Time()).addSystemAtStage(World_1.CoreStage.First, timeSystem_1.timeSystem);
exports.timePlugin = timePlugin;
