"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = exports.CoreStage = void 0;
const Entity_1 = require("./Entity");
const ResourceManager_1 = require("./ResourceManager");
const ResourceClassManager_1 = require("./ResourceClassManager");
const immutable_1 = require("immutable");
const EntityBuilder_1 = require("./EntityBuilder");
const Query_1 = require("./Query");
var CoreStage;
(function (CoreStage) {
    CoreStage[CoreStage["First"] = 0] = "First";
    CoreStage[CoreStage["PreUpdate"] = 1] = "PreUpdate";
    CoreStage[CoreStage["Update"] = 2] = "Update";
    CoreStage[CoreStage["PostUpdate"] = 3] = "PostUpdate";
    CoreStage[CoreStage["Last"] = 4] = "Last";
})(CoreStage = exports.CoreStage || (exports.CoreStage = {}));
class World extends (0, immutable_1.Record)({
    entities: new ResourceManager_1.ResourceManager(),
    components: (0, immutable_1.Map)(),
    resources: new ResourceClassManager_1.ResourceClassManager(),
    systems: (0, immutable_1.List)(),
    commands: (0, immutable_1.List)(),
}, "ecs.World") {
    addPlugin(plugin) {
        return this.addPlugins(plugin);
    }
    addPlugins(...plugins) {
        return plugins.reduce((world, plugin) => plugin(world), this);
    }
    addSystemAtStage(stage, system) {
        let systems = this.systems.get(stage);
        if (!systems) {
            systems = new ResourceManager_1.ResourceManager();
        }
        return this.set("systems", this.systems.set(stage, systems.addResource(system)));
    }
    addSystem(system) {
        return this.addSystemAtStage(CoreStage.Update, system);
    }
    deleteSystemAtStage(stage, system) {
        const systems = this.systems.get(stage);
        if (systems) {
            return this.set("systems", this.systems.set(stage, systems.deleteResource(system)));
        }
        else {
            return this;
        }
    }
    deleteSystem(system) {
        return this.deleteSystemAtStage(CoreStage.Update, system);
    }
    addResource(resource) {
        return this.set("resources", this.resources.addResource(resource));
    }
    setResource(Resource, resource) {
        return this.set("resources", this.resources.setResource(Resource, resource));
    }
    deleteResource(Resource) {
        return this.set("resources", this.resources.deleteResource(Resource));
    }
    getResource(Resource) {
        return this.resources.getResource(Resource);
    }
    updateResource(Resource, updateFn) {
        return this.set("resources", this.resources.updateResource(Resource, updateFn));
    }
    addComponent(entity, component) {
        let components = this.components.get(entity);
        if (!components) {
            components = new ResourceClassManager_1.ResourceClassManager();
        }
        return this.set("components", this.components.set(entity, components.addResource(component)));
    }
    deleteComponent(entity, Component) {
        const components = this.components.get(entity);
        if (components) {
            const newComponents = components.deleteResource(Component);
            if (newComponents.isEmpty()) {
                return this.set("components", this.components.delete(entity));
            }
            else {
                return this.set("components", this.components.set(entity, newComponents));
            }
        }
        else {
            return this;
        }
    }
    getComponent(entity, Component) {
        const components = this.components.get(entity);
        if (components) {
            return components.getResource(Component);
        }
        else {
            return undefined;
        }
    }
    updateComponent(entity, Component, updateFn) {
        const components = this.components.get(entity);
        if (components) {
            return this.set("components", this.components.set(entity, components.updateResource(Component, updateFn)));
        }
        else {
            return this;
        }
    }
    setComponent(entity, Component, component) {
        const components = this.components.get(entity);
        if (components) {
            return this.set("components", this.components.set(entity, components.setResource(Component, component)));
        }
        else {
            return this;
        }
    }
    withEntity(fn) {
        const [world, entity] = fn(new EntityBuilder_1.EntityBuilder(this, new Entity_1.Entity())).build();
        return world.set("entities", world.entities.addResource(entity));
    }
    addEntity(entity) {
        return this.set("entities", this.entities.addResource(entity));
    }
    deleteEntity(entity) {
        return this.set("entities", this.entities.deleteResource(entity));
    }
    runCommandAtStage(stage, command) {
        let stageCommands = this.commands.get(stage);
        if (!stageCommands) {
            stageCommands = (0, immutable_1.List)();
        }
        return this.set("commands", this.commands.set(stage, stageCommands.push(command)));
    }
    runCommand(command) {
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
                updated = system(updated);
            }
        }
        for (const stageCommands of updated.commands) {
            if (!stageCommands) {
                continue;
            }
            for (const command of stageCommands.values()) {
                updated = command(updated);
            }
        }
        updated = updated.set("commands", updated.commands.clear());
        return updated;
    }
    maintain() {
        let updated = this;
        for (const [entity, entityComponentResources] of updated.components) {
            const updatedEntityComponentResources = entityComponentResources.maintain();
            if (updatedEntityComponentResources.isEmpty()) {
                updated = updated.set("components", updated.components.delete(entity));
            }
            else {
                updated = updated.set("components", updated.components.set(entity, updatedEntityComponentResources));
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
            }
            else {
                updated = updated.set("systems", updated.systems.set(index, updatedStage));
            }
        }
        return updated;
    }
    *query(...query) {
        for (const [entity, components] of this.components.entries()) {
            const result = (0, Query_1.runQuery)(entity, components, query);
            if (result !== undefined) {
                yield result;
            }
        }
    }
    queryOne(entity, ...query) {
        const components = this.components.get(query[0]);
        if (components) {
            return (0, Query_1.runQuery)(entity, components, query);
        }
        else {
            return undefined;
        }
    }
}
exports.World = World;
