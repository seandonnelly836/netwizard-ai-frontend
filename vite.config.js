import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In local dev, proxy /api/chat to the Express server on :3001
      // In production (Vercel), /api/chat is handled by api/chat.js directly
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
