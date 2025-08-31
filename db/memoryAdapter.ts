import { User, Challenge } from './types';

const users: User[] = [];
const challenges: Challenge[] = [];

export async function getUserById(id: string) {
  return users.find(u => u._id === id) || null;
}

export async function saveUser(user: User) {
  const index = users.findIndex(u => u._id === user._id);
  if (index > -1) users[index] = user;
  else users.push(user);
}

export async function saveChallenge(chal: Challenge) {
  challenges.push(chal);
}

export async function getChallenge(chal: string) {
  return challenges.find(c => c.challenge === chal) || null;
}

export async function deleteChallenge(chal: string) {
  const index = challenges.findIndex(c => c.challenge === chal);
  if (index > -1) challenges.splice(index, 1);
}
