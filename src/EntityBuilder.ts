import { Entity } from "./Entity";
import { Parent } from "./hierarchy/Parent";
import type { World } from "./World";

const noop = (builder: EntityBuilder) => builder;

export class EntityBuilder {
  protected world: World;
  protected entity: Entity;

  constructor(world: World, entity: Entity) {
    this.world = world.addEntity(entity);
    this.entity = entity;
  }

  withComponent<C>(component: C) {
    this.world = this.world.addComponent(this.entity, component);
    return this;
  }
  addComponent<C>(component: C) {
    this.world = this.world.addComponent(this.entity, component);
    return this;
  }

  withChild(fn: (builder: EntityBuilder) => EntityBuilder = noop) {
    const childEntity = new Entity();
    this.world = this.world.addEntity(childEntity);
    this.world = this.world.addComponent(
      childEntity,
      new Parent({ entity: this.entity })
    );
    const [world, _entity] = fn(
      new EntityBuilder(this.world, childEntity)
    ).build();
    this.world = world;
    return this;
  }
  addChild(entity: Entity) {
    this.world = this.world.addComponent(
      entity,
      new Parent({ entity: this.entity })
    );
    return this;
  }

  build(): [world: World, entity: Entity] {
    return [this.world, this.entity];
  }
}
