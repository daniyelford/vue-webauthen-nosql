// db/mongoAdapter.ts
import { getDb } from './connection';
import { User, Challenge } from './types';

// گرفتن کاربر بر اساس userId
export async function getUserById(userId: string): Promise<User | null> {
  const db = await getDb();
  return db.collection<User>('users').findOne({ _id: userId });
}

// ذخیره یا بروزرسانی کاربر
export async function saveUser(user: User) {
  const db = await getDb();
  await db.collection<User>('users').updateOne(
    { _id: user._id },
    { $set: user },
    { upsert: true } // اگر وجود نداشت، اضافه شود
  );
}

// ذخیره یا بروزرسانی چالش
export async function saveChallenge(chal: Challenge) {
  const db = await getDb();
  await db.collection<Challenge>('challenges').updateOne(
    { challenge: chal.challenge },
    { $set: chal },
    { upsert: true }
  );
}

// گرفتن چالش بر اساس مقدار challenge
export async function getChallenge(challenge: string): Promise<Challenge | null> {
  const db = await getDb();
  return db.collection<Challenge>('challenges').findOne({ challenge });
}

// حذف چالش
export async function deleteChallenge(challenge: string) {
  const db = await getDb();
  await db.collection<Challenge>('challenges').deleteOne({ challenge });
}
