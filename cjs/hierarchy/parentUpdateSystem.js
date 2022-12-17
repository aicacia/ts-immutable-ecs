"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parentUpdateSystem = void 0;
const immutable_1 = require("immutable");
const Entity_1 = require("../Entity");
const Children_1 = require("./Children");
const Parent_1 = require("./Parent");
const PreviousParent_1 = require("./PreviousParent");
const Query_1 = require("../Query");
function parentUpdateSystem(world) {
    for (const [entity, previousParent] of world.query(Entity_1.Entity, PreviousParent_1.PreviousParent, (0, Query_1.without)(Parent_1.Parent))) {
        world = world.updateComponent(previousParent.entity, Children_1.Children, (previousChildren) => previousChildren.set("children", previousChildren.children.delete(entity)));
        world = world.deleteComponent(entity, PreviousParent_1.PreviousParent);
    }
    const newChildren = new Map();
    for (const [entity, parent, previousParent] of world.query(Entity_1.Entity, Parent_1.Parent, (0, Query_1.optional)(PreviousParent_1.PreviousParent))) {
        const parentEntity = parent.entity;
        if (previousParent) {
            const previousParentEntity = previousParent.entity;
            if (previousParentEntity === parentEntity) {
                continue;
            }
            world = world.updateComponent(previousParentEntity, Children_1.Children, (previousChildren) => previousChildren.set("children", previousChildren.children.delete(entity)));
            world = world.updateComponent(entity, PreviousParent_1.PreviousParent, (previousParent) => previousParent.set("entity", parentEntity));
        }
        else {
            world = world.addComponent(entity, new PreviousParent_1.PreviousParent({ entity: parentEntity }));
        }
        const parentChildren = world.getComponent(parentEntity, Children_1.Children);
        if (parentChildren) {
            if (!parentChildren.children.includes(entity)) {
                world = world.updateComponent(parentEntity, Children_1.Children, (parentChildren) => parentChildren.set("children", parentChildren.children.add(entity)));
            }
        }
        else {
            const children = newChildren.get(parentEntity);
            if (children) {
                children.push(entity);
            }
            else {
                newChildren.set(parentEntity, [entity]);
            }
        }
    }
    for (const [parent, children] of newChildren) {
        world = world.addComponent(parent, new Children_1.Children({ children: (0, immutable_1.OrderedSet)(children) }));
    }
    return world;
}
exports.parentUpdateSystem = parentUpdateSystem;
