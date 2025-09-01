# vue-webauthen-nosql

A lightweight **Vue 3 + WebAuthn** authentication package with **NoSQL database support**.  
This package provides a simple API to register and authenticate users using **biometrics (fingerprint, face recognition)** or **security keys** with FIDO2 / WebAuthn standards.

---

## 🚀 Features
- 🔑 Passwordless authentication (WebAuthn / FIDO2)
- 📱 Supports fingerprint, security keys (USB, NFC, Bluetooth), and platform authenticators
- 🗄️ Built-in support for **NoSQL databases** (MongoDB, DocumentDB, etc.)
- ⚡ Easy integration with **Vue 3** (Composition API)
- 🛡️ Secure challenge/response flow with `@simplewebauthn/server`
- 🌍 Ready for modern SPA / PWA projects

---

## 📦 Installation

```bash
npm install vue-webauthen-nosql
```
or with Yarn:
```bash
yarn add vue-webauthen-nosql
```
## 🔧 Usage
1. Setup Server (Node.js + Express Example)
```ts
import express from 'express';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';

const app = express();

app.post('/register', async (req, res) => {
  const options = generateRegistrationOptions({
    rpName: 'My App',
    rpID: 'localhost',
    userID: '123456',
    userName: 'test@example.com',
  });

  res.json(options);
});

app.post('/verify-register', async (req, res) => {
  const verification = await verifyRegistrationResponse({
    credential: req.body,
    expectedChallenge: req.session.challenge,
    expectedOrigin: 'http://localhost:5173',
    expectedRPID: 'localhost',
  });

  res.json(verification);
});
```

2. Use in Vue 3 (Frontend)
```vue
<script setup lang="ts">
import { startRegistration } from '@simplewebauthn/browser';

async function register() {
  const resp = await fetch('/register');
  const options = await resp.json();

  const attResp = await startRegistration(options);

  await fetch('/verify-register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(attResp),
  });
}
</script>

<template>
  <button @click="register">Register with Fingerprint</button>
</template>
```
## 📂 Database Integration (NoSQL Example with MongoDB)
```ts
// Save authenticator info in MongoDB
await db.collection('authenticators').insertOne({
  userID: '123456',
  credentialID: verification.registrationInfo.credentialID,
  publicKey: verification.registrationInfo.credentialPublicKey,
  counter: verification.registrationInfo.counter,
  transports: verification.registrationInfo.transports,
});
```
## 🛠 Configuration

Environment variables (.env):
```env
RP_ID=localhost
ORIGIN=http://localhost:5173
```

In server code:
```ts
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
```
## 📜 API
- Server Functions

 - generateRegistrationOptions()

 - verifyRegistrationResponse()

 - generateAuthenticationOptions()

 - verifyAuthenticationResponse()

- Client Functions

 - startRegistration()

 - startAuthentication()

## 🧪 Testing

You can test your WebAuthn flow with unit and integration tests.  
We recommend using one of the following:

- [**Vitest**](https://vitest.dev/) – Fast, Vite-native test runner (perfect for Vue 3 projects)
- [**Jest**](https://jestjs.io/) – Mature and widely used JavaScript testing framework

Example (Vitest):

```ts
import { describe, it, expect } from 'vitest';
import { generateRegistrationOptions } from '@simplewebauthn/server';

describe('WebAuthn Registration', () => {
  it('should generate registration options', () => {
    const options = generateRegistrationOptions({
      rpName: 'Test RP',
      rpID: 'localhost',
      userID: '123',
      userName: 'test@example.com',
    });
    expect(options.challenge).toBeDefined();
  });
});
```

## 📌 Requirements

- Node.js >= 18

- Vue 3

- MongoDB (or another NoSQL database)

## 📄 License

MIT © 2025 [Dnylfrd](mailto:29danialfrd69@gmail.com) ❤️.

---