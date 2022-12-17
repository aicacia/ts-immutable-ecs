import raf from "raf";
export class Loop {
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
            raf.cancel(this.id);
            this.id = null;
        }
        return this;
    }
    isStopped() {
        return this.running === false;
    }
    request() {
        this.id = raf(this.run);
        return this;
    }
}
