import { CoreStage, World } from "../World";
import { parentUpdateSystem } from "./parentUpdateSystem";

export const hierarchyPlugin = () => (world: World) =>
  world
    .runCommandAtStage(CoreStage.First, parentUpdateSystem)
    .addSystemAtStage(CoreStage.PostUpdate, parentUpdateSystem);
