import { CoreStage, World } from "../World";
import { Time } from "./Time";
import { timeSystem } from "./timeSystem";

export const timePlugin = () => (world: World) =>
  world.addResource(new Time()).addSystemAtStage(CoreStage.First, timeSystem);
