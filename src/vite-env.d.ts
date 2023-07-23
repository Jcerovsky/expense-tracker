/// <reference types="vite/client" />

// vite-env.d.ts
interface ImportMetaEnv {
  VITE_API_KEY: string;
  VITE_APP_ID: string;
  VITE_MESSAGING_SERVER_ID: string;
  VITE_STORAGE_BUCKET: string;
  VITE_PROJECT_ID: string;
  VITE_AUTH_DOMAIN: string;
}
