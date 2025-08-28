"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbClient = exports.dbName = exports.uri = void 0;
exports.getDb = getDb;
exports.connectDB = connectDB;
// db/connector.ts
const mongodb_1 = require("mongodb");
exports.uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
exports.dbName = 'webauthn';
async function getDb() {
    if (!exports.dbClient) {
        exports.dbClient = new mongodb_1.MongoClient(exports.uri);
        await exports.dbClient.connect();
    }
    return exports.dbClient.db(exports.dbName);
}
async function connectDB() {
    await getDb();
    console.log('MongoDB connected');
}
