import { Entity } from "./Entity";
import { ResourceManager } from "./ResourceManager";
import { ResourceClassManager } from "./ResourceClassManager";
import type { IConstructor } from "./IConstructor";
import { List, Map, Record } from "immutable";
import { EntityBuilder } from "./EntityBuilder";
import { IQueryResult, runQuery } from "./Query";

export enum CoreStage {
  First = 0,
  PreUpdate = 1,
  Update = 2,
  PostUpdate = 3,
  Last = 4,
}

export type IWorldFn = (world: World) => World;

export class World extends Record(
  {
    entities: new ResourceManager<Entity>(),
    components: Map<Entity, ResourceClassManager<unknown>>(),
    resources: new ResourceClassManager<unknown>(),
    systems: List<ResourceManager<IWorldFn>>(),
    commands: List<List<IWorldFn>>(),
  },
  "ecs.World"
) {
  addPlugin(plugin: IWorldFn) {
    return this.addPlugins(plugin);
  }
  addPlugins(...plugins: IWorldFn[]) {
    return plugins.reduce(
      (world, plugin) => plugin(world),
      this as World
    ) as this;
  }

  addSystemAtStage(stage: CoreStage, system: IWorldFn) {
    let systems = this.systems.get(stage);
    if (!systems) {
      systems = new ResourceManager();
    }
    return this.set(
      "systems",
      this.systems.set(stage, systems.addResource(system))
    );
  }
  addSystem(system: IWorldFn) {
    return this.addSystemAtStage(CoreStage.Update, system);
  }
  deleteSystemAtStage(stage: CoreStage, system: IWorldFn) {
    const systems = this.systems.get(stage);
    if (systems) {
      return this.set(
        "systems",
        this.systems.set(stage, systems.deleteResource(system))
      );
    } else {
      return this;
    }
  }
  deleteSystem(system: IWorldFn) {
    return this.deleteSystemAtStage(CoreStage.Update, system);
  }

  addResource<R>(resource: R) {
    return this.set("resources", this.resources.addResource(resource));
  }
  setResource<R>(Resource: IConstructor<R>, resource: R) {
    return this.set(
      "resources",
      this.resources.setResource(Resource, resource)
    );
  }
  deleteResource<R>(Resource: IConstructor<R>) {
    return this.set("resources", this.resources.deleteResource(Resource));
  }
  getResource<R>(Resource: IConstructor<R>): R | undefined {
    return this.resources.getResource(Resource) as R;
  }
  updateResource<R>(Resource: IConstructor<R>, updateFn: (resource: R) => R) {
    return this.set(
      "resources",
      this.resources.updateResource(Resource, updateFn as any)
    );
  }

  addComponent<C>(entity: Entity, component: C) {
    let components = this.components.get(entity) as ResourceClassManager<C>;
    if (!components) {
      components = new ResourceClassManager<C>();
    }
    return this.set(
      "components",
      this.components.set(entity, components.addResource(component))
    );
  }
  deleteComponent<C>(entity: Entity, Component: IConstructor<C>) {
    const components = this.components.get(entity) as ResourceClassManager<C>;
    if (components) {
      const newComponents = components.deleteResource(Component);
      if (newComponents.isEmpty()) {
        return this.set("components", this.components.delete(entity));
      } else {
        return this.set(
          "components",
          this.components.set(entity, newComponents)
        );
      }
    } else {
      return this;
    }
  }
  getComponent<C>(entity: Entity, Component: IConstructor<C>): C | undefined {
    const components = this.components.get(entity);
    if (components) {
      return components.getResource(Component) as C;
    } else {
      return undefined;
    }
  }
  updateComponent<C>(
    entity: Entity,
    Component: IConstructor<C>,
    updateFn: (component: C) => C
  ) {
    const components = this.components.get(entity);
    if (components) {
      return this.set(
        "components",
        this.components.set(
          entity,
          components.updateResource(Component, updateFn as any)
        )
      );
    } else {
      return this;
    }
  }
  setComponent<C>(entity: Entity, Component: IConstructor<C>, component: C) {
    const components = this.components.get(entity);
    if (components) {
      return this.set(
        "components",
        this.components.set(
          entity,
          components.setResource(Component, component)
        )
      );
    } else {
      return this;
    }
  }

  withEntity(fn: (builder: EntityBuilder) => EntityBuilder) {
    const [world, entity] = fn(new EntityBuilder(this, new Entity())).build();
    return world.set("entities", world.entities.addResource(entity));
  }
  addEntity(entity: Entity) {
    return this.set("entities", this.entities.addResource(entity));
  }
  deleteEntity(entity: Entity) {
    return this.set("entities", this.entities.deleteResource(entity));
  }

  runCommandAtStage(stage: CoreStage, command: IWorldFn) {
    let stageCommands = this.commands.get(stage);
    if (!stageCommands) {
      stageCommands = List();
    }
    return this.set(
      "commands",
      this.commands.set(stage, stageCommands.push(command))
    );
  }
  runCommand(command: IWorldFn) {
    this.runCommandAtStage(CoreStage.Update, command);
    return this;
  }

  update() {
    let updated = this;
    updated = updated.maintain();
    for (const stage of updated.systems) {
      if (!stage) {
        continue;
      }
      for (const system of stage.values()) {
        updated = system(updated) as this;
      }
    }
    for (const stageCommands of updated.commands) {
      if (!stageCommands) {
        continue;
      }
      for (const command of stageCommands.values()) {
        updated = command(updated) as this;
      }
    }
    updated = updated.set("commands", updated.commands.clear());
    return updated;
  }

  maintain() {
    let updated = this;
    for (const [entity, entityComponentResources] of updated.components) {
      const updatedEntityComponentResources =
        entityComponentResources.maintain();

      if (updatedEntityComponentResources.isEmpty()) {
        updated = updated.set("components", updated.components.delete(entity));
      } else {
        updated = updated.set(
          "components",
          updated.components.set(entity, updatedEntityComponentResources)
        );
      }
    }
    updated = updated.set("entities", updated.entities.maintain());
    updated = updated.set("resources", updated.resources.maintain());
    for (const [index, stage] of updated.systems.entries()) {
      if (!stage) {
        continue;
      }
      const updatedStage = stage.maintain();
      if (updatedStage.isEmpty()) {
        updated = updated.set("systems", updated.systems.delete(index));
      } else {
        updated = updated.set(
          "systems",
          updated.systems.set(index, updatedStage)
        );
      }
    }
    return updated;
  }

  *query<T extends Array<any>>(...query: T): Iterable<IQueryResult<T>> {
    for (const [entity, components] of this.components.entries()) {
      const result = runQuery(entity, components, query);
      if (result !== undefined) {
        yield result;
      }
    }
  }

  queryOne<T extends Array<any>>(
    entity: Entity,
    ...query: T
  ): IQueryResult<T> | undefined {
    const components = this.components.get(query[0]);
    if (components) {
      return runQuery(entity, components, query);
    } else {
      return undefined;
    }
  }
}
