// db/mongoAdapter.ts
import { MongoClient } from 'mongodb';
import { User, Challenge } from './types';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'webauthn';
let dbClient: MongoClient;

async function getDb() {
  if (!dbClient) {
    dbClient = new MongoClient(uri);
    await dbClient.connect();
  }
  return dbClient.db(dbName);
}

// --- USER ---
export async function getUserById(userId: string): Promise<User | null> {
  const db = await getDb();
  const user = await db.collection<User>('users').findOne({ _id: userId });
  return user;
}

export async function saveUser(user: User) {
  const db = await getDb();
  await db.collection<User>('users').updateOne(
    { _id: user._id },
    { $set: user },
    { upsert: true }
  );
}

// --- CHALLENGE ---
export async function saveChallenge(chal: Challenge) {
  const db = await getDb();
  await db.collection<Challenge>('challenges').updateOne(
    { challenge: chal.challenge },
    { $set: chal },
    { upsert: true }
  );
}

export async function getChallenge(challenge: string): Promise<Challenge | null> {
  const db = await getDb();
  return await db.collection<Challenge>('challenges').findOne({ challenge });
}

export async function deleteChallenge(challenge: string) {
  const db = await getDb();
  await db.collection<Challenge>('challenges').deleteOne({ challenge });
}
