import { Collection, Filter } from "mongodb";

/**
 * Get a document matching a query with specific fields
 */
export async function findOne<
  CollectionType,
  Props extends keyof CollectionType,
  NarrowedType extends Pick<CollectionType, Props>
>(
  collection: Collection<CollectionType>,
  filter: Filter<CollectionType>,
  keys: Props[]
): Promise<NarrowedType> {
  const projection: Record<string, number> = keys.reduce(
    (a, v) => ({ ...a, [v]: 1 }),
    {}
  );

  // supress "_id" by default unless it is explicitly set to be projected
  if (!("_id" in projection)) {
    projection["_id"] = 0;
  }

  const document = await collection.findOne(filter, {
    projection: projection,
  });

  if (!document) {
    throw new Error("Document not found");
  }

  return document as unknown as NarrowedType;
}

/**
 * Get a document matching a query without specific fields
 */
export async function findOneWithout<
  CollectionType,
  Props extends keyof CollectionType,
  NarrowedType extends Omit<CollectionType, Props>
>(
  collection: Collection<CollectionType>,
  filter: Filter<CollectionType>,
  keys: Props[]
): Promise<NarrowedType> {
  const projection: Record<string, number> = keys.reduce(
    (a, v) => ({ ...a, [v]: 0 }),
    {}
  );

  // supress "_id" by default unless it is explicitly set to be projected
  if (!("_id" in projection)) {
    projection["_id"] = 0;
  }

  const document = await collection.findOne(filter, {
    projection: projection,
  });

  if (!document) {
    throw new Error("Document not found");
  }

  return document as unknown as NarrowedType;
}

/**
 * Get a document matching a query
 */
export async function findOneEntire<CollectionType>(
  collection: Collection<CollectionType>,
  filter: Filter<CollectionType>
): Promise<CollectionType> {
  const document = await collection.findOne(filter, {
    projection: { _id: 0 },
  });

  if (!document) {
    throw new Error("Document not found");
  }

  return document as unknown as CollectionType;
}
