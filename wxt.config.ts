import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Cookie Assistant',
    version: '1.0.1',
    permissions: [
      'cookies',
      'notifications',
      'clipboardRead',
      'clipboardWrite',
    ],
    host_permissions: ['<all_urls>'],
  },
  vite: () => ({
    plugins: [react()],
  }),
});
