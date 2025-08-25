// client/useLogin.ts
import { ref } from 'vue';
import { post } from './api';

export function useLogin() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const userId = ref<string | null>(null);

  async function login(userIdInput?: string) {
    loading.value = true;
    error.value = null;
    userId.value = null;

    try {
      // 1. گرفتن options از backend
      const options = await post('login/options', { userId: userIdInput });

      // 2. WebAuthn navigator.credentials.get
      const cred = await navigator.credentials.get({ publicKey: options } as any);

      // 3. ارسال credential به backend برای verify
      const result = await post('login/verify', { body: cred });

      if (result.verified) userId.value = result.userId;
      else userId.value = null;
    } catch (err: any) {
      error.value = err.message || 'Login failed';
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, userId, login };
}
