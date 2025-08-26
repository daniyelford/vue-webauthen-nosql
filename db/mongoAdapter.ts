// db/mongoAdapter.ts
import { getDb } from './connection';
import { User, Challenge } from './types';
export async function getUserById(userId: string): Promise<User | null> {
  const db = await getDb();
  return db.collection<User>('users').findOne({ _id: userId });
}
export async function saveUser(user: User) {
  const db = await getDb();
  await db.collection<User>('users').updateOne(
    { _id: user._id },
    { $set: user },
    { upsert: true }
  );
}
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
  return db.collection<Challenge>('challenges').findOne({ challenge });
}

export async function deleteChallenge(challenge: string) {
  const db = await getDb();
  await db.collection<Challenge>('challenges').deleteOne({ challenge });
}
