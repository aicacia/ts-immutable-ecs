import { CoreStage } from "../World";
import { parentUpdateSystem } from "./parentUpdateSystem";
export const hierarchyPlugin = () => (world) => world
    .runCommandAtStage(CoreStage.First, parentUpdateSystem)
    .addSystemAtStage(CoreStage.PostUpdate, parentUpdateSystem);
