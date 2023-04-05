import { Record } from "immutable";
declare const Time_base: Record.Factory<{
    scale: number;
    fixedDelta: number;
    frame: number;
    last: number;
    current: number;
    delta: number;
    fps: number;
    fpsFrame: number;
    fpsLast: number;
    startTime: number;
    minDelta: number;
    maxDelta: number;
}>;
export declare class Time extends Time_base {
    static toString(): string;
    getStartTime(): number;
    getDelta(): number;
    getRealDelta(): number;
    getCurrent(): number;
    getMinDelta(): number;
    setMinDelta(minDelta: number): this;
    getMaxDelta(): number;
    setMaxDelta(maxDelta: number): this;
    getFrame(): number;
    getFps(): number;
    getScale(): number;
    setScale(scale: number): this;
    getFixedDelta(): number;
    setFixedDelta(fixedDelta: number): this;
    now(): number;
    tick(): this;
}
export {};
