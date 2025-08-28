"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from 'cors';
// import bodyParser from 'body-parser';
const app = (0, express_1.default)();
// app.use(cors());
// app.use(bodyParser.json());
async function startServer() {
    // const authModule = await import('../../server/authRoutes.js');
    // const authRoutes = authModule.default as unknown as Router;
    const { connectDB } = await import('../../db/connection.js');
    // app.use('/webauthn', authRoutes);
    await connectDB();
    app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
}
startServer();
