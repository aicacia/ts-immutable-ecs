"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
let ENTITY_ID = 0;
class Entity {
    constructor(id) {
        this.id = id || ENTITY_ID++;
    }
    getId() {
        return this.id;
    }
    toString() {
        return this.id;
    }
}
exports.Entity = Entity;
