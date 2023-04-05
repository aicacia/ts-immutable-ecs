import { Entity } from "./Entity";
import type { ResourceClassManager } from "./ResourceClassManager";
export type IChangedQuery<T> = {
    changed: T;
};
export type IDeletedQuery<T> = {
    deleted: T;
};
export type IWithoutQuery<T> = {
    without: T;
};
export type IOptionalQuery<T> = {
    optional: T;
};
export type IOneOfQuery<T> = {
    oneOf: T;
};
export declare function isChangedQuery<T>(value: unknown): value is IChangedQuery<T>;
export declare function isDeletedQuery<T>(value: unknown): value is IDeletedQuery<T>;
export declare function isWithoutQuery<T>(value: unknown): value is IWithoutQuery<T>;
export declare function isOptionalQuery<T>(value: unknown): value is IOptionalQuery<T>;
export declare function isOneOfQuery<T>(value: unknown): value is IOneOfQuery<T>;
export declare function changed<T>(changed: T): IChangedQuery<T>;
export declare function deleted<T>(deleted: T): IDeletedQuery<T>;
export declare function without<T>(without: T): IWithoutQuery<T>;
export declare function optional<T>(optional: T): IOptionalQuery<T>;
export declare function oneOf<T extends Array<any>>(...oneOf: T): IOneOfQuery<T>;
export type IInstanceType<T> = T extends new (...args: any[]) => infer R ? R : T extends (...args: any[]) => infer R ? R : T;
export type IAnyOfArray<T> = T extends [infer A] ? A : T extends [infer A, infer B] ? A | B : T extends [infer A, infer B, infer C] ? A | B | C : T extends [infer A, infer B, infer C, infer D] ? A | B | C | D : T extends [infer A, infer B, infer C, infer D, infer E] ? A | B | C | D | E : T extends [infer A, infer B, infer C, infer D, infer E, infer F] ? A | B | C | D | E | F : T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G] ? A | B | C | D | E | F | G : T extends [
    infer A,
    infer B,
    infer C,
    infer D,
    infer E,
    infer F,
    infer G,
    infer H
] ? A | B | C | D | E | F | G | H : T extends [
    infer A,
    infer B,
    infer C,
    infer D,
    infer E,
    infer F,
    infer G,
    infer H,
    infer I
] ? A | B | C | D | E | F | G | H | I : T extends [
    infer A,
    infer B,
    infer C,
    infer D,
    infer E,
    infer F,
    infer G,
    infer H,
    infer I,
    infer J
] ? A | B | C | D | E | F | G | H | I | J : T;
export type IQueryResult<T> = T extends [infer A] ? [IQueryResult<A>] : T extends [infer A, infer B] ? [IQueryResult<A>, IQueryResult<B>] : T extends [infer A, infer B, infer C] ? [IQueryResult<A>, IQueryResult<B>, IQueryResult<C>] : T extends [infer A, infer B, infer C, infer D] ? [IQueryResult<A>, IQueryResult<B>, IQueryResult<C>, IQueryResult<D>] : T extends [infer A, infer B, infer C, infer D, infer E] ? [
    IQueryResult<A>,
    IQueryResult<B>,
    IQueryResult<C>,
    IQueryResult<D>,
    IQueryResult<E>
] : T extends [infer A, infer B, infer C, infer D, infer E, infer F] ? [
    IQueryResult<A>,
    IQueryResult<B>,
    IQueryResult<C>,
    IQueryResult<D>,
    IQueryResult<E>,
    IQueryResult<F>
] : T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G] ? [
    IQueryResult<A>,
    IQueryResult<B>,
    IQueryResult<C>,
    IQueryResult<D>,
    IQueryResult<E>,
    IQueryResult<F>,
    IQueryResult<G>
] : T extends [
    infer A,
    infer B,
    infer C,
    infer D,
    infer E,
    infer F,
    infer G,
    infer H
] ? [
    IQueryResult<A>,
    IQueryResult<B>,
    IQueryResult<C>,
    IQueryResult<D>,
    IQueryResult<E>,
    IQueryResult<F>,
    IQueryResult<G>,
    IQueryResult<H>
] : T extends [
    infer A,
    infer B,
    infer C,
    infer D,
    infer E,
    infer F,
    infer G,
    infer H,
    infer I
] ? [
    IQueryResult<A>,
    IQueryResult<B>,
    IQueryResult<C>,
    IQueryResult<D>,
    IQueryResult<E>,
    IQueryResult<F>,
    IQueryResult<G>,
    IQueryResult<H>,
    IQueryResult<I>
] : T extends [
    infer A,
    infer B,
    infer C,
    infer D,
    infer E,
    infer F,
    infer G,
    infer H,
    infer I,
    infer J
] ? [
    IQueryResult<A>,
    IQueryResult<B>,
    IQueryResult<C>,
    IQueryResult<D>,
    IQueryResult<E>,
    IQueryResult<F>,
    IQueryResult<G>,
    IQueryResult<H>,
    IQueryResult<I>,
    IQueryResult<J>
] : T extends IChangedQuery<infer _> ? boolean : T extends IDeletedQuery<infer _> ? boolean : T extends IWithoutQuery<infer _> ? null : T extends IOptionalQuery<infer U> ? IQueryResult<U> | undefined : T extends IOneOfQuery<infer U> ? IQueryResult<IAnyOfArray<U>> : T extends Entity ? Entity : IInstanceType<T>;
export declare function runQuery<T>(entity: Entity, components: ResourceClassManager<unknown>, query: T): IQueryResult<T> | undefined;
