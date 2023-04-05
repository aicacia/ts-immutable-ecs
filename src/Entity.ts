let ENTITY_ID = 0;

export function nextEntityId() {
  return ENTITY_ID++;
}

export class Entity {
  protected id: number;

  constructor(id?: number) {
    this.id = id == undefined ? nextEntityId() : id;
  }

  getId() {
    return this.id;
  }

  toString() {
    return this.id;
  }
}
