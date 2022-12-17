import { Entity } from "./Entity";
import { Parent } from "./hierarchy/Parent";
const noop = (builder) => builder;
export class EntityBuilder {
    constructor(world, entity) {
        this.world = world.addEntity(entity);
        this.entity = entity;
    }
    withComponent(component) {
        this.world = this.world.addComponent(this.entity, component);
        return this;
    }
    addComponent(component) {
        this.world = this.world.addComponent(this.entity, component);
        return this;
    }
    withChild(fn = noop) {
        const childEntity = new Entity();
        this.world = this.world.addEntity(childEntity);
        this.world = this.world.addComponent(childEntity, new Parent({ entity: this.entity }));
        const [world, _entity] = fn(new EntityBuilder(this.world, childEntity)).build();
        this.world = world;
        return this;
    }
    addChild(entity) {
        this.world = this.world.addComponent(entity, new Parent({ entity: this.entity }));
        return this;
    }
    build() {
        return [this.world, this.entity];
    }
}
