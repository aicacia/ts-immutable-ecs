import { CoreStage, World } from "../World";
import { syncSimpleTransforms, transformSystem } from "./systems";

export const transformPlugin = () => (world: World) =>
  world
    .addSystemAtStage(CoreStage.PreUpdate, syncSimpleTransforms)
    .addSystemAtStage(CoreStage.PreUpdate, transformSystem);
