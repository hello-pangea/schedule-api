import { Collection, InsertOneResult, OptionalUnlessRequiredId } from "mongodb";

/**
 * Insert one document into a specified collection
 */
export async function insertOne<CollectionType>(
  collection: Collection<CollectionType>,
  doc: OptionalUnlessRequiredId<CollectionType>
): Promise<InsertOneResult<CollectionType>> {
  const result = await collection.insertOne(doc);

  if (!result.acknowledged) {
    throw new Error("Could not insert document");
  }

  return result;
}
