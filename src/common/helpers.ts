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
