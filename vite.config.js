// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@config': path.resolve(__dirname, './src/config'),
      '@app': path.resolve(__dirname, './src/app'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  build: {
    target: 'es2020',
    sourcemap: false,
    // On laisse Vite gérer le vendor split automatiquement pour éviter les TDZ/cycles
    // chunkSizeWarningLimit peut rester si besoin
    chunkSizeWarningLimit: 900,
    // ❌ pas de rollupOptions.output.manualChunks (provoquait l'erreur)
  },
});
