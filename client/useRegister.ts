// client/useRegister.ts
import { ref } from 'vue';
import { post } from './api';

export function useRegister() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  async function register(userId: string) {
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      // 1. گرفتن options از backend
      const options = await post('register/options', { userId });

      // 2. WebAuthn navigator.credentials.create
      const cred = await navigator.credentials.create({ publicKey: options } as any);

      // 3. ارسال credential به backend برای verify
      const verified = await post('register/verify', { userId, body: cred });

      success.value = verified.verified;
    } catch (err: any) {
      error.value = err.message || 'Registration failed';
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, success, register };
}
