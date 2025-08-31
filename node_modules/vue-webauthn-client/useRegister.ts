import { ref } from 'vue';
import { post } from './api';
import { base64UrlToBuffer } from './base64';
export function useRegister() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);
  async function register(userId: string) {
    loading.value = true;
    error.value = null;
    success.value = false;
    try {
      const options: any = await post('register/options', { userId });
      options.challenge = base64UrlToBuffer(options.challenge);
      options.user.id = new TextEncoder().encode(options.user.id.toString());
      if (options.excludeCredentials) {
        options.excludeCredentials = options.excludeCredentials.map((cred: any) => ({
          ...cred,
          id: base64UrlToBuffer(cred.id),
        }));
      }
      const credential = await navigator.credentials.create({ publicKey: options } as any);
      if (!credential) {
        throw new Error('Registration cancelled or failed');
      }
      const verified = await post('register/verify', { userId, body: credential });
      success.value = verified.verified;
    } catch (err: any) {
      error.value = err.message || 'Registration failed';
    } finally {
      loading.value = false;
    }
  }
  return { loading, error, success, register };
}
