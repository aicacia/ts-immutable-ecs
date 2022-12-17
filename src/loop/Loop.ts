import raf from "raf";

export type ILoopHandler = (ms: number) => void;

export class Loop {
  private id: number | null = null;
  private running = false;
  private updateFn: ILoopHandler;

  constructor(updateFn: ILoopHandler) {
    this.updateFn = updateFn;
  }

  start = () => {
    if (!this.running) {
      this.running = true;
      this.request();
    }
  };
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

  private run = (ms: number) => {
    this.updateFn(ms);

    if (this.running) {
      this.request();
    }
    return this;
  };

  private request() {
    this.id = raf(this.run);
    return this;
  }
}
