import { CoreStage } from "../World";
import { Time } from "./Time";
import { timeSystem } from "./timeSystem";
export const timePlugin = () => (world) => world.addResource(new Time()).addSystemAtStage(CoreStage.First, timeSystem);
