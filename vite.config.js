import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // three / fiber / drei ne sont volontairement pas listés ici : un chunk
        // manuel est rattaché à l'entrée, donc Vite lui injecte un
        // <link rel="modulepreload"> et le télécharge dès l'ouverture du site.
        // Laissé à Rollup, il suit l'import dynamique de CarScene et n'arrive
        // qu'à l'approche de la section Contact.
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
