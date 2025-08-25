// client/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.vue';

// استایل پایه (می‌تونی خودت اضافه کنی)
// import './style.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.mount('#app');
