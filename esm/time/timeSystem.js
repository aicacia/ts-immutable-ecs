import { Time } from "./Time";
export const timeSystem = (world) => world.updateResource(Time, (time) => time.tick());
