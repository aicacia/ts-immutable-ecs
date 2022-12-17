"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loop = void 0;
const tslib_1 = require("tslib");
const raf_1 = tslib_1.__importDefault(require("raf"));
class Loop {
    constructor(updateFn) {
        this.id = null;
        this.running = false;
        this.start = () => {
            if (!this.running) {
                this.running = true;
                this.request();
            }
        };
        this.run = (ms) => {
            this.updateFn(ms);
            if (this.running) {
                this.request();
            }
            return this;
        };
        this.updateFn = updateFn;
    }
    stop() {
        this.running = false;
        if (this.id !== null) {
            raf_1.default.cancel(this.id);
            this.id = null;
        }
        return this;
    }
    isStopped() {
        return this.running === false;
    }
    request() {
        this.id = (0, raf_1.default)(this.run);
        return this;
    }
}
exports.Loop = Loop;
