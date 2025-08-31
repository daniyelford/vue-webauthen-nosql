"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegistrationOptions = createRegistrationOptions;
exports.verifyRegistration = verifyRegistration;
exports.createAuthenticationOptions = createAuthenticationOptions;
exports.verifyAuthentication = verifyAuthentication;
// server/webauthnService.ts
const server_1 = require("@simplewebauthn/server");
const mongoAdapter_1 = require("../db/mongoAdapter");
const rpName = 'My-Home';
const rpID = 'my-home.ir';
const origin = 'https://www.my-home.ir';
async function createRegistrationOptions(userId) {
    const user = await (0, mongoAdapter_1.getUserById)(userId);
    if (!user)
        throw new Error('User not found');
    const options = (0, server_1.generateRegistrationOptions)({
        rpName,
        rpID,
        userID: user._id,
        userName: user.username,
        attestationType: 'indirect',
        authenticatorSelection: {
            userVerification: 'preferred',
        },
    });
    await (0, mongoAdapter_1.saveChallenge)({
        challenge: options.challenge,
        user_id: userId,
        type: 'registration',
        createdAt: new Date(),
    });
    return options;
}
async function verifyRegistration(userId, body) {
    const challengeRecord = await (0, mongoAdapter_1.getChallenge)(body.response.clientDataJSON.challenge);
    if (!challengeRecord)
        throw new Error('Challenge not found');
    const user = await (0, mongoAdapter_1.getUserById)(userId);
    if (!user)
        throw new Error('User not found');
    const verification = await (0, server_1.verifyRegistrationResponse)({
        credential: body, // جدید
        expectedChallenge: challengeRecord.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
    });
    if (verification.verified && verification.registrationInfo) {
        const newCred = {
            id: verification.registrationInfo.credentialID,
            publicKey: verification.registrationInfo.credentialPublicKey,
            counter: verification.registrationInfo.counter,
            transports: [], // اختیاری
        };
        user.credentials.push(newCred);
        await (0, mongoAdapter_1.saveUser)(user);
        await (0, mongoAdapter_1.deleteChallenge)(challengeRecord.challenge);
    }
    return verification.verified;
}
async function createAuthenticationOptions(userId) {
    const user = userId ? await (0, mongoAdapter_1.getUserById)(userId) : undefined;
    const allowCredentials = user?.credentials.map(cred => ({
        id: cred.id,
        type: 'public-key',
        transports: cred.transports,
    }));
    const options = (0, server_1.generateAuthenticationOptions)({
        allowCredentials,
        userVerification: 'preferred',
        rpID,
    });
    await (0, mongoAdapter_1.saveChallenge)({
        challenge: options.challenge,
        user_id: userId || null,
        type: 'authentication',
        createdAt: new Date(),
    });
    return options;
}
async function verifyAuthentication(body) {
    const chal = await (0, mongoAdapter_1.getChallenge)(body.response.clientDataJSON.challenge);
    if (!chal)
        return { verified: false, userId: null };
    const user = chal.user_id ? await (0, mongoAdapter_1.getUserById)(chal.user_id) : null;
    if (!user || !user.credentials.length)
        return { verified: false, userId: null };
    const authenticator = user.credentials[0];
    const verification = await (0, server_1.verifyAuthenticationResponse)({
        credential: body,
        expectedChallenge: chal.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: {
            credentialID: authenticator.id,
            credentialPublicKey: authenticator.publicKey,
            counter: authenticator.counter,
            transports: authenticator.transports,
        },
    });
    await (0, mongoAdapter_1.deleteChallenge)(chal.challenge);
    return {
        verified: verification.verified,
        userId: verification.verified ? chal.user_id : null,
    };
}
