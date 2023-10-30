import { UUID, randomUUID } from 'node:crypto';

/**
 * Entity is a type of object that is not defined by its attributes, but rather by a thread of continuity and its identity.
 */
export type Entity<T = unknown> = {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
} & T;

/**
 * Aggregate is a type of entity that is the root of an aggregate.
 */
export type Aggregate<T> = Entity<T>;

/**
 * EntityId is a type of unique identifier for an entity.
 */
export type EntityId = UUID;

export const entityFactory = <T>(
  props: Omit<T, 'id' | 'updatedAt' | 'createdAt'>,
): Entity<T> => ({
  id: randomUUID(),
  ...(props as T),
  createdAt: new Date(),
  updatedAt: new Date(),
});

/**
 * Optional is a type that represents an optional value.
 */
export type Optional<T> = T | null | undefined;
export type OptionalPromise<T> = Promise<Optional<T>>;

/**
 * Omit is a type that represents an object without a given set of properties.
 */
export type Replace<T, R extends Partial<T>> = Omit<T, keyof R> & R;

/**
 * Result Monad Implementation
 * A simple implementation of the Result Monad based on the Rust's Result type.
 */
export type Result<T, E> = Ok<T> | Err<E>;

type Ok<T> = {
  kind: 'ok';
  isOk: true;
  value: T;
};

type Err<T> = {
  kind: 'err';
  isOk: false;
  error: T;
};

const Ok = <T>(value: T): Ok<T> => ({
  kind: 'ok',
  isOk: true,
  value,
});

const Err = <T>(error: T): Err<T> => ({
  kind: 'err',
  isOk: false,
  error,
});

export const Result = {
  Ok,
  Err,
};
