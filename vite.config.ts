import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
  gifsicle: { optimizationLevel: 7 },
  optipng: { optimizationLevel: 7 },
  mozjpeg: { quality: 70 },
}),
    viteCompression({ 
   algorithm: 'brotliCompress', // or 'gzip'
  ext: '.br',}),
    VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
  devOptions: {
    enabled: true,
    type: 'module', // optional but better for dev
  },
  manifest: {
    name: 'My App Name',
    short_name: 'MyApp',
    description: 'Your app description',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
})
  ],
  optimizeDeps: {
  include: ['react', 'react-dom', 'axios'], // Add your key deps
},
    build: {
    target: 'esnext', // modern JS
    minify: 'esbuild', // faster than terser
    sourcemap: false, // disable unless needed
  },
    server: {
    host: true,              // Allows external access (e.g. Gitpod)
    allowedHosts: true,     // Allows any domain name (Gitpod, etc.)
  },
})
