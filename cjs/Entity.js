"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = exports.nextEntityId = void 0;
let ENTITY_ID = 0;
function nextEntityId() {
    return ENTITY_ID++;
}
exports.nextEntityId = nextEntityId;
class Entity {
    constructor(id) {
        this.id = id == undefined ? nextEntityId() : id;
    }
    getId() {
        return this.id;
    }
    toString() {
        return this.id;
    }
}
exports.Entity = Entity;
