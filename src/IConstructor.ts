export type IConstructor<T = any, A extends any[] = any[]> = new (
  ...args: A
) => T;
