import type { World } from "../World";
import { Time } from "./Time";

export const timeSystem = (world: World) =>
  world.updateResource(Time, (time) => time.tick());
