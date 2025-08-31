import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  VerifiedRegistrationResponse,
  VerifiedAuthenticationResponse,
} from '@simplewebauthn/server';
import base64url from 'base64url';
import { 
  getUserById, 
  saveUser, 
  saveChallenge, 
  getChallenge, 
  deleteChallenge 
} from '../db/mongoAdapter';
import { Credential } from '../db/types';
const rpName = process.env.RP_NAME||'webauthen';
const rpID = process.env.RP_ID || 'localhost';
const origin = process.env.ORIGIN || 'http://localhost:5173';
export async function createRegistrationOptions(userId: string) {
  let user = await getUserById(userId);
  if (!user) {
    user = {
      _id: userId,
      credentials: []
    };
    await saveUser(user);
  }

  const options = generateRegistrationOptions({
    rpName,
    rpID,
    userID: user._id,
    userName: user._id, // چون username رو حذف کردیم، userId جایگزین شد
    attestationType: 'indirect',
    authenticatorSelection: {
      userVerification: 'preferred',
    },
  });

  await saveChallenge({
    challenge: options.challenge,
    user_id: userId,
    type: 'registration',
    createdAt: new Date(),
  });

  return options;
}
function base64urlToString(base64url: string): string {
  const padding = "=".repeat((4 - (base64url.length % 4)) % 4);
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/") + padding;
  const raw = Buffer.from(base64, "base64").toString("utf-8");
  return raw;
}
export async function verifyRegistration(userId: string, body: any) {
  const clientDataJSON = JSON.parse(base64urlToString(body.response.clientDataJSON));
  const challenge = clientDataJSON.challenge;
  const challengeRecord = await getChallenge(challenge);
  if (!challengeRecord) throw new Error('Challenge not found');
  const user = await getUserById(userId);
  if (!user) throw new Error('User not found');
  const verification: VerifiedRegistrationResponse = await verifyRegistrationResponse({
    credential: body,
    expectedChallenge: challengeRecord.challenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });
  if (verification.verified && verification.registrationInfo) {
    const newCred: Credential = {
      id: verification.registrationInfo.credentialID,
      publicKey: verification.registrationInfo.credentialPublicKey,
      counter: verification.registrationInfo.counter,
      transports:body.response.transports, 
    };
    user.credentials.push(newCred);
    await saveUser(user);
    await deleteChallenge(challengeRecord.challenge);
  }
  return verification.verified;
}
export async function createAuthenticationOptions(userId?: string) {
  const user = userId ? await getUserById(userId) : undefined;
  const allowCredentials = user?.credentials.map(cred => ({
    id: new Uint8Array(cred.id.buffer),
    type: 'public-key' as const,
    transports: cred.transports,
  }));
  const options = generateAuthenticationOptions({
    allowCredentials,
    userVerification: 'preferred',
    rpID,
  });
  await saveChallenge({
    challenge: options.challenge,
    user_id: userId || null,
    type: 'authentication',
    createdAt: new Date(),
  });
  return options;
}
export async function verifyAuthentication(body: any) {
  const clientDataJSON = JSON.parse(base64urlToString(body.response.clientDataJSON));
  const challenge = clientDataJSON.challenge;
  const chal = await getChallenge(challenge);
  if (!chal) return { verified: false, userId: null };
  const user = chal.user_id ? await getUserById(chal.user_id) : null;
  if (!user || !user.credentials.length) return { verified: false, userId: null };
  const authenticator = user.credentials[0];
  const idBuffer = base64url.toBuffer(authenticator.id.toString('base64'));
  const pubKeyBuffer = base64url.toBuffer(authenticator.publicKey.toString('base64'));
  const verification: VerifiedAuthenticationResponse = verifyAuthenticationResponse({
    credential: body,
    expectedChallenge: chal.challenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
    authenticator: {
      credentialID: idBuffer, 
      credentialPublicKey: pubKeyBuffer,
      counter: authenticator.counter,
      transports: authenticator.transports,
    },
  });
  console.log(verification)
  await deleteChallenge(chal.challenge);
  return {
    verified: verification.verified,
    userId: verification.verified ? chal.user_id : null,
  };
}
