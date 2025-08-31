import { Router } from 'express';
import { createRegistrationOptions, verifyRegistration, createAuthenticationOptions, verifyAuthentication } from './webauthnService';

const router = Router();

// Registration
router.post('/register/options', async (req, res) => {
  try {
    const { userId } = req.body;
    const options = await createRegistrationOptions(userId);
    res.json(options);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/register/verify', async (req, res) => {
  try {
    const { userId, body } = req.body;
    const verified = await verifyRegistration(userId, body);
    res.json({ verified });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Authentication
router.post('/login/options', async (req, res) => {
  try {
    const { userId } = req.body;
    const options = await createAuthenticationOptions(userId);
    res.json(options);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login/verify', async (req, res) => {
  try {
    const result = await verifyAuthentication(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
