let ENTITY_ID = 0;
export class Entity {
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
