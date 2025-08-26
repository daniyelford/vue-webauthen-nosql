vue-webauthen-nosql/
  ├── client/                  # سمت فرانت (Vue composables + JS helpers)
  │   └── .env
  │   └── api.ts               # فانکشن axios برای ارتباط
  │   └── App.vue               
  │   └── index.html              
  │   └── main.ts
  │   └── shims-vue.d.ts
  │   └── tsconfig.json
  │   ├── useLogin.ts          # composable ورود
  │   ├── useRegister.ts       # composable ثبت‌نام
  │   └── vite.config.ts          
  │
  ├── db/                      # ارتباط با NoSQL
  │   ├── mongoAdapter.ts      # آداپتر Mongo
  │   ├── memoryAdapter.ts     # (برای تست)
  │   └── types.ts             # اینترفیس‌ها
  │
  ├── examples/                # مثال آماده
  │   ├── express-server/      # نمونه بک‌اند
  │       └── index.ts
  │   └── vue-client/          # نمونه فرانت
  │       └── App.vue
  │
  ├── server/                  # سمت بک‌اند (Node + Express)
  │   ├── authRoutes.ts        # روت‌ها (login/register)
  │   └── index.ts             # setup express
  │   ├── webauthnService.ts   # متدهای مربوط به WebAuthn
  │
  └── .env
  ├── index.ts                 # entry point پکیج
  └── package.json
  └── tsconfig.json

npx tsc