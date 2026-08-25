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
        // three / fiber / drei et gsap ne sont volontairement pas listés ici :
        // un chunk manuel est rattaché à l'entrée, donc Vite lui injecte un
        // <link rel="modulepreload"> et le télécharge dès l'ouverture du site.
        // Laissés à Rollup, ils suivent les imports dynamiques qui les
        // demandent et n'arrivent qu'à l'approche de leur section. gsap n'est
        // utilisé que par des composants chargés en `lazy` (ScrollReveal,
        // Certifications, CardSwap, BlobCursor) : le lister ici annulait leur
        // chargement différé et coûtait 116 Ko au premier rendu.
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})
