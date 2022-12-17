"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeSystem = void 0;
const Time_1 = require("./Time");
const timeSystem = (world) => world.updateResource(Time_1.Time, (time) => time.tick());
exports.timeSystem = timeSystem;
