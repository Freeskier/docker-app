import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      //host: '0.0.0.0',
      port: parseInt(env.VITE_APP_PORT),
      // proxy: {
      //   '/api': {
      //     target: env.VITE_API,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    plugins: [react()],
    css: {
      modules: {
        generateScopedName: '[name]_[local]_[hash:base64:5]',
      },
    },
  };
});
