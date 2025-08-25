<template>
  <div>
    <h1>WebAuthn Test</h1>

    <div>
      <h2>Register</h2>
      <input v-model="userId" placeholder="User ID" />
      <button @click="handleRegister" :disabled="loadingRegister">
        {{ loadingRegister ? 'Loading...' : 'Register' }}
      </button>
      <p v-if="errorRegister" style="color:red">{{ errorRegister }}</p>
      <p v-if="successRegister" style="color:green">Registration Success!</p>
    </div>

    <div style="margin-top:2em">
      <h2>Login</h2>
      <input v-model="loginId" placeholder="User ID (optional)" />
      <button @click="handleLogin" :disabled="loadingLogin">
        {{ loadingLogin ? 'Loading...' : 'Login' }}
      </button>
      <p v-if="errorLogin" style="color:red">{{ errorLogin }}</p>
      <p v-if="userIdLogin" style="color:green">Login Success! User ID: {{ userIdLogin }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRegister } from '../../client/useRegister';
import { useLogin } from '../../client/useLogin';

export default {
  setup() {
    const userId = ref('');
    const loginId = ref('');

    // Register
    const { loading: loadingRegister, error: errorRegister, success: successRegister, register } = useRegister();
    const handleRegister = () => register(userId.value);

    // Login
    const { loading: loadingLogin, error: errorLogin, userId: userIdLogin, login } = useLogin();
    const handleLogin = () => login(loginId.value || undefined);

    return {
      userId,
      loginId,
      loadingRegister,
      errorRegister,
      successRegister,
      handleRegister,
      loadingLogin,
      errorLogin,
      userIdLogin,
      handleLogin,
    };
  },
};
</script>
