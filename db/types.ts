import { AuthenticatorTransportFuture } from '@simplewebauthn/typescript-types';

export interface Credential {
  id: Buffer;             
  publicKey: Buffer;      
  counter: number;        
  deviceType?: string;    
  transports?: AuthenticatorTransportFuture[];  
}

export interface User {
  _id: string;           // فقط userId
  credentials: Credential[];
}

export interface Challenge {
  challenge: string;
  user_id?: string | null;
  type: 'registration' | 'authentication';
  createdAt: Date;
}
