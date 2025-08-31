"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
exports.saveUser = saveUser;
exports.saveChallenge = saveChallenge;
exports.getChallenge = getChallenge;
exports.deleteChallenge = deleteChallenge;
// db/mongoAdapter.ts
const connection_1 = require("./connection");
async function getUserById(userId) {
    const db = await (0, connection_1.getDb)();
    return db.collection('users').findOne({ _id: userId });
}
async function saveUser(user) {
    const db = await (0, connection_1.getDb)();
    await db.collection('users').updateOne({ _id: user._id }, { $set: user }, { upsert: true });
}
async function saveChallenge(chal) {
    const db = await (0, connection_1.getDb)();
    await db.collection('challenges').updateOne({ challenge: chal.challenge }, { $set: chal }, { upsert: true });
}
async function getChallenge(challenge) {
    const db = await (0, connection_1.getDb)();
    return db.collection('challenges').findOne({ challenge });
}
async function deleteChallenge(challenge) {
    const db = await (0, connection_1.getDb)();
    await db.collection('challenges').deleteOne({ challenge });
}
