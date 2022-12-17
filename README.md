# ts-immutable-ecs

[![license](https://img.shields.io/badge/license-MIT%2FApache--2.0-blue")](LICENSE-MIT)
[![docs](https://img.shields.io/badge/docs-typescript-blue.svg)](https://aicacia.github.io/ts-immutable-ecs/)
[![npm (scoped)](https://img.shields.io/npm/v/@aicacia/immutable-ecs)](https://www.npmjs.com/package/@aicacia/immutable-ecs)
[![build](https://github.com/aicacia/ts-immutable-ecs/workflows/Test/badge.svg)](https://github.com/aicacia/ts-immutable-ecs/actions?query=workflow%3ATest)

immutable entity component system

```ts
import { World, hierarchyPlugin } from "@aicacia/immutable-ecs";
import { timePlugin } from "@aicacia/immutable-ecs/time";
import { Loop } from "@aicacia/immutable-ecs/loop";
import {
  Transform3D,
  GlobalTransform3D,
  transformPlugin,
} from "@aicacia/immutable-ecs/transform";
import { quat, vec3 } from "gl-matrix";

export function onLoad() {
  let world = new World()
    .addPlugin(timePlugin())
    .addPlugin(hierarchyPlugin())
    .addPlugin(transformPlugin())
    .withEntity((parent) =>
      parent
        .withComponent(
          new Transform3D({
            position: vec3.fromValues(1, 1, 1),
            rotation: quat.fromEuler(quat.create(), 90, 0, 0),
          })
        )
        .withComponent(new GlobalTransform3D())
        .withChild((child) =>
          child
            .withComponent(
              new Transform3D({
                position: vec3.fromValues(1, 1, 1),
                rotation: quat.fromEuler(quat.create(), 90, 0, 0),
              })
            )
            .withComponent(new GlobalTransform3D())
            .withChild((grandChild) =>
              grandChild
                .withComponent(
                  new Transform3D({
                    position: vec3.fromValues(1, 1, 1),
                    rotation: quat.fromEuler(quat.create(), 90, 0, 0),
                  })
                )
                .withComponent(new GlobalTransform3D())
            )
        )
    );

  const loop = new Loop(() => {
    world = world.update();
  });
  loop.start();

  Object.defineProperty(window, "world", {
    get() {
      return world;
    },
  });
}

window.addEventListener("load", onLoad);
```
