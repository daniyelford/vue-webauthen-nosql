import { ref } from 'vue';
import { post } from './api';
import { base64UrlToBuffer } from './base64';
export function useLogin() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const userId = ref<string | null>(null);
  async function login(userIdInput?: string) {
    loading.value = true;
    error.value = null;
    userId.value = null;
    try {
      const options = await post('login/options', { userId: userIdInput });
      options.challenge = base64UrlToBuffer(options.challenge);
      if (options.allowCredentials) {
        options.allowCredentials = options.allowCredentials.map((cred: any) => ({
          ...cred,
          id: base64UrlToBuffer(cred.id as string),
        }));
      }
      const credential = await navigator.credentials.get({ publicKey: options } as any);
      if (!credential) throw new Error('Authentication cancelled or failed');
      const result = await post('login/verify', credential);
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