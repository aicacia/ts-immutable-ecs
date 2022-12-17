import { CoreStage } from "../World";
import { syncSimpleTransforms, transformSystem } from "./systems";
export const transformPlugin = () => (world) => world
    .addSystemAtStage(CoreStage.PreUpdate, syncSimpleTransforms)
    .addSystemAtStage(CoreStage.PreUpdate, transformSystem);
