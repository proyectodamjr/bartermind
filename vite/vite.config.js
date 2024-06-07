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
        main: path.resolve(__dirname, 'inicio.html'), 
        upload: path.resolve(__dirname, 'upload.html'),
        perfil: path.resolve(__dirname, 'perfil.html'),
        misCursos: path.resolve(__dirname, 'misCursos.html'),
        nuevo: path.resolve(__dirname, 'nuevo.html'),
        perfilUsuario: path.resolve(__dirname, 'perfilUsuario.html'),
      },
    },
  },
});
