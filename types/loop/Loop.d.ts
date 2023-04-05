export type ILoopHandler = (ms: number) => void;
export declare class Loop {
    private id;
    private running;
    private updateFn;
    constructor(updateFn: ILoopHandler);
    start: () => void;
    stop(): this;
    isStopped(): boolean;
    private run;
    private request;
}
