import { Collection, Filter, UpdateFilter, UpdateResult } from "mongodb";

/**
 * Update one document within a specified collection
 */
export async function updateOne<CollectionType>(
  collection: Collection<CollectionType>,
  filter: Filter<CollectionType>,
  update: UpdateFilter<CollectionType>,
  options?: { upsert?: boolean }
): Promise<UpdateResult> {
  const result = await collection.updateOne(filter, update, {
    upsert: options?.upsert ?? false,
  });

  if (!result.acknowledged) {
    throw new Error("Could not update document");
  }

  return result;
}
