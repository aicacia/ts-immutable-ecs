"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const immutable_1 = require("immutable");
const utils_1 = require("../utils");
class Time extends (0, immutable_1.Record)({
    scale: 1.0,
    fixedDelta: 1.0 / 60.0,
    frame: 0,
    last: -(1.0 / 60.0),
    current: 0.0,
    delta: 1.0 / 60.0,
    fps: 60.0,
    fpsFrame: 0,
    fpsLast: 0,
    startTime: Date.now() * 0.001,
    minDelta: 0.000001,
    maxDelta: Infinity,
}, "ecs.time.Time") {
    static toString() {
        return Time.displayName;
    }
    getStartTime() {
        return this.startTime;
    }
    getDelta() {
        return this.delta * this.scale;
    }
    getRealDelta() {
        return this.delta * this.scale;
    }
    getCurrent() {
        return this.current;
    }
    getMinDelta() {
        return this.minDelta;
    }
    setMinDelta(minDelta) {
        return this.set("minDelta", minDelta);
    }
    getMaxDelta() {
        return this.maxDelta;
    }
    setMaxDelta(maxDelta) {
        return this.set("maxDelta", maxDelta);
    }
    getFrame() {
        return this.frame;
    }
    getFps() {
        return this.fps;
    }
    getScale() {
        return this.scale;
    }
    setScale(scale) {
        return this.set("scale", scale);
    }
    getFixedDelta() {
        return this.fixedDelta * this.scale;
    }
    setFixedDelta(fixedDelta) {
        return this.set("fixedDelta", fixedDelta);
    }
    now() {
        return Date.now() * 0.001 - this.startTime;
    }
    tick() {
        let updated = this.set("frame", this.frame + 1)
            .set("last", this.current)
            .set("current", this.now())
            .set("fpsFrame", this.fpsFrame + 1);
        if (updated.fpsLast + 1 < updated.current) {
            updated = updated
                .set("fps", updated.fpsFrame / (updated.current - updated.fpsLast))
                .set("fpsLast", this.current)
                .set("fpsFrame", 0);
        }
        return updated.set("delta", (0, utils_1.clamp)((updated.current - updated.last) * updated.scale, updated.minDelta, updated.maxDelta));
    }
}
exports.Time = Time;
