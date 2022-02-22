import mongodb, { Collection } from "mongodb";
import Event from "../../interfaces/event.js";

const uri = process.env.MONGO_URI ?? "";

// Shared db instance
export let db: mongodb.Db;
export let collections: {
  events: Collection<Event>;
};

// Call once to connect to mongo and setup shared db instance
export function connectToServer(): Promise<void> {
  return mongodb.MongoClient.connect(uri).then((client) => {
    db = client.db("db");

    collections = {
      events: db.collection("events"),
    };
  });
}
