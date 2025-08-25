// db/types.ts
import { AuthenticatorTransportFuture } from '@simplewebauthn/typescript-types';
export interface Credential {
  id: Buffer;             // credentialID به صورت Buffer
  publicKey: Buffer;      // کلید عمومی به صورت Buffer
  counter: number;        // counter WebAuthn
  deviceType?: string;    
  transports?: AuthenticatorTransportFuture[];  
}

export interface User {
  _id: string;
  username: string;
  credentials: Credential[];
}

export interface Challenge {
  challenge: string;
  user_id: string | null;
  type: 'registration' | 'authentication';
  createdAt: Date;
}
