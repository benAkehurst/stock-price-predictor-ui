import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(process.env.DB_URL);
  return client;
}

export async function insertDocument(client, collectionName, document) {
  const db = client.db();
  const result = await db.collection(collectionName).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, eventId, sort) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(eventId ? { eventId: eventId } : {})
    .sort(sort)
    .toArray();
  return documents;
}
