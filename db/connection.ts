// db/connector.ts
import { MongoClient } from 'mongodb';
export const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
export const dbName = 'webauthn';
export let dbClient: MongoClient;

export async function getDb() {
  if (!dbClient) {
    dbClient = new MongoClient(uri);
    await dbClient.connect();
  }
  return dbClient.db(dbName);
}

export async function connectDB() {
  await getDb();
  console.log('MongoDB connected');
}
