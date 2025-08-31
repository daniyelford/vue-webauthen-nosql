"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/authRoutes.ts
const express_1 = require("express");
const webauthnService_1 = require("./webauthnService");
const router = (0, express_1.Router)();
// Registration
router.post('/register/options', async (req, res) => {
    try {
        const { userId } = req.body;
        const options = await (0, webauthnService_1.createRegistrationOptions)(userId);
        res.json(options);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.post('/register/verify', async (req, res) => {
    try {
        const { userId, body } = req.body;
        const verified = await (0, webauthnService_1.verifyRegistration)(userId, body);
        res.json({ verified });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Authentication
router.post('/login/options', async (req, res) => {
    try {
        const { userId } = req.body; // optional
        const options = await (0, webauthnService_1.createAuthenticationOptions)(userId);
        res.json(options);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.post('/login/verify', async (req, res) => {
    try {
        const { body } = req.body;
        const result = await (0, webauthnService_1.verifyAuthentication)(body);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.default = router;
