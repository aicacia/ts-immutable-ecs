import { World, hierarchyPlugin } from "../../src";
import { timePlugin } from "../../src/time";
import { Loop } from "../../src/loop";
import {
  Transform3D,
  GlobalTransform3D,
  transformPlugin,
} from "../../src/transform";
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
