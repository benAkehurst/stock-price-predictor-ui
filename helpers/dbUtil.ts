import { MongoClient, ObjectId } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(process.env.DB_URL);
  return client;
}

export async function insertDocument(client, collectionName, document) {
  const db = client.db();
  const result = await db.collection(collectionName).insertOne(document);
  return result;
}

export async function getAllPredictions(client, collection, userId, sort) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find({ userId: userId })
    .sort(sort)
    .toArray();
  return documents;
}

export async function getSinglePrediction(client, collection, predictionId) {
  const db = client.db();
  const documents = await db.collection(collection).find().toArray();
  const singlePrediction = documents.filter((prediction) => {
    return new ObjectId(prediction._id).toString() === predictionId;
  });
  return singlePrediction;
}

export async function deleteSinglePrediction(client, collection, predictionId) {
  const db = client.db();
  const deletedPrediction = await db
    .collection(collection)
    .deleteOne({ _id: new ObjectId(predictionId) });
  return deletedPrediction;
}
