// client/api.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/webauthn';

export async function post(endpoint: string, data: any) {
  try {
    const res = await axios.post(`${API_BASE}/${endpoint}`, data);
    return res.data;
  } catch (err: any) {
    console.error('API Error:', err.response?.data || err.message);
    throw err;
  }
}
