import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, '../vista'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'inicio.html'), // Apuntar a inicio.html
      },
    },
  },
});