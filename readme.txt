vue-webauthen-nosql/
  ├── client/                  # سمت فرانت (Vue composables + JS helpers)
  │   ├── useRegister.ts       # composable ثبت‌نام
  │   ├── useLogin.ts          # composable ورود
  │   └── api.ts               # فانکشن axios برای ارتباط
  │   └── index.html              
  │   └── vite.config.ts          
  │   └── .env
  │
  ├── server/                  # سمت بک‌اند (Node + Express)
  │   ├── authRoutes.ts        # روت‌ها (login/register)
  │   ├── webauthnService.ts   # متدهای مربوط به WebAuthn
  │   └── index.ts             # setup express
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
  ├── index.ts                 # entry point پکیج
  └── package.json
  └── .env
