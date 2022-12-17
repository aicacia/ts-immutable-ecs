let ENTITY_ID = 0;

export class Entity {
  protected id: number;

  constructor(id?: number) {
    this.id = id || ENTITY_ID++;
  }

  getId() {
    return this.id;
  }

  toString() {
    return this.id;
  }
}
