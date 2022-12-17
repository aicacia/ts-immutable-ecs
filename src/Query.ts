import { Entity } from "./Entity";
import type { ResourceClassManager } from "./ResourceClassManager";

export type IChangedQuery<T> = { changed: T };
export type IDeletedQuery<T> = { deleted: T };
export type IWithoutQuery<T> = { without: T };
export type IOptionalQuery<T> = { optional: T };
export type IOneOfQuery<T> = { oneOf: T };

export function isChangedQuery<T>(value: unknown): value is IChangedQuery<T> {
  return "changed" in (value as any);
}
export function isDeletedQuery<T>(value: unknown): value is IDeletedQuery<T> {
  return "deleted" in (value as any);
}
export function isWithoutQuery<T>(value: unknown): value is IWithoutQuery<T> {
  return "without" in (value as any);
}
export function isOptionalQuery<T>(value: unknown): value is IOptionalQuery<T> {
  return "optional" in (value as any);
}
export function isOneOfQuery<T>(value: unknown): value is IOneOfQuery<T> {
  return "oneOf" in (value as any);
}

export function changed<T>(changed: T): IChangedQuery<T> {
  return { changed };
}
export function deleted<T>(deleted: T): IDeletedQuery<T> {
  return { deleted };
}
export function without<T>(without: T): IWithoutQuery<T> {
  return { without };
}
export function optional<T>(optional: T): IOptionalQuery<T> {
  return { optional };
}
export function oneOf<T extends Array<any>>(...oneOf: T): IOneOfQuery<T> {
  return { oneOf };
}

export type IInstanceType<T> = T extends new (...args: any[]) => infer R
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : T;

export type IAnyOfArray<T> = T extends [infer A]
  ? A
  : T extends [infer A, infer B]
  ? A | B
  : T extends [infer A, infer B, infer C]
  ? A | B | C
  : T extends [infer A, infer B, infer C, infer D]
  ? A | B | C | D
  : T extends [infer A, infer B, infer C, infer D, infer E]
  ? A | B | C | D | E
  : T extends [infer A, infer B, infer C, infer D, infer E, infer F]
  ? A | B | C | D | E | F
  : T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G]
  ? A | B | C | D | E | F | G
  : T extends [
      infer A,
      infer B,
      infer C,
      infer D,
      infer E,
      infer F,
      infer G,
      infer H
    ]
  ? A | B | C | D | E | F | G | H
  : T extends [
      infer A,
      infer B,
      infer C,
      infer D,
      infer E,
      infer F,
      infer G,
      infer H,
      infer I
    ]
  ? A | B | C | D | E | F | G | H | I
  : T extends [
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
    ]
  ? A | B | C | D | E | F | G | H | I | J
  : T;

export type IQueryResult<T> = T extends [infer A]
  ? [IQueryResult<A>]
  : T extends [infer A, infer B]
  ? [IQueryResult<A>, IQueryResult<B>]
  : T extends [infer A, infer B, infer C]
  ? [IQueryResult<A>, IQueryResult<B>, IQueryResult<C>]
  : T extends [infer A, infer B, infer C, infer D]
  ? [IQueryResult<A>, IQueryResult<B>, IQueryResult<C>, IQueryResult<D>]
  : T extends [infer A, infer B, infer C, infer D, infer E]
  ? [
      IQueryResult<A>,
      IQueryResult<B>,
      IQueryResult<C>,
      IQueryResult<D>,
      IQueryResult<E>
    ]
  : T extends [infer A, infer B, infer C, infer D, infer E, infer F]
  ? [
      IQueryResult<A>,
      IQueryResult<B>,
      IQueryResult<C>,
      IQueryResult<D>,
      IQueryResult<E>,
      IQueryResult<F>
    ]
  : T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G]
  ? [
      IQueryResult<A>,
      IQueryResult<B>,
      IQueryResult<C>,
      IQueryResult<D>,
      IQueryResult<E>,
      IQueryResult<F>,
      IQueryResult<G>
    ]
  : T extends [
      infer A,
      infer B,
      infer C,
      infer D,
      infer E,
      infer F,
      infer G,
      infer H
    ]
  ? [
      IQueryResult<A>,
      IQueryResult<B>,
      IQueryResult<C>,
      IQueryResult<D>,
      IQueryResult<E>,
      IQueryResult<F>,
      IQueryResult<G>,
      IQueryResult<H>
    ]
  : T extends [
      infer A,
      infer B,
      infer C,
      infer D,
      infer E,
      infer F,
      infer G,
      infer H,
      infer I
    ]
  ? [
      IQueryResult<A>,
      IQueryResult<B>,
      IQueryResult<C>,
      IQueryResult<D>,
      IQueryResult<E>,
      IQueryResult<F>,
      IQueryResult<G>,
      IQueryResult<H>,
      IQueryResult<I>
    ]
  : T extends [
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
    ]
  ? [
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
    ]
  : T extends IChangedQuery<infer _>
  ? boolean
  : T extends IDeletedQuery<infer _>
  ? boolean
  : T extends IWithoutQuery<infer _>
  ? null
  : T extends IOptionalQuery<infer U>
  ? IQueryResult<U> | undefined
  : T extends IOneOfQuery<infer U>
  ? IQueryResult<IAnyOfArray<U>>
  : T extends Entity
  ? Entity
  : IInstanceType<T>;

export function runQuery<T>(
  entity: Entity,
  components: ResourceClassManager<unknown>,
  query: T
): IQueryResult<T> | undefined {
  return runQueryInternal(entity, components, query);
}

function runQueryInternal(
  entity: Entity,
  components: ResourceClassManager<unknown>,
  query: unknown
): any {
  if (Array.isArray(query)) {
    const result = [];
    for (const q of query) {
      const r = runQueryInternal(entity, components, q);
      if (r !== undefined) {
        result.push(r);
      } else {
        return undefined;
      }
    }
    return result;
  } else if (isChangedQuery(query)) {
    return components.changedResource(query.changed as any);
  } else if (isDeletedQuery(query)) {
    return components.deletedResource(query.deleted as any);
  } else if (isWithoutQuery(query)) {
    if (components.hasResource(query.without as any)) {
      return undefined;
    } else {
      return null;
    }
  } else if (isOptionalQuery(query)) {
    return components.getResource(query.optional as any);
  } else if (isOneOfQuery(query)) {
    for (const subQuery of query.oneOf as any) {
      const subResult = runQueryInternal(entity, components, subQuery);
      if (subResult !== undefined) {
        return subResult;
      }
    }
    return undefined;
  } else if (query === Entity) {
    return entity;
  } else {
    return components.getResource(query as any);
  }
}
