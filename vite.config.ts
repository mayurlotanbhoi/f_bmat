import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin'

// Use actual image paths instead of imports for PWA icons
// PWA icons should be in the public folder, not imported as modules

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 70 },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2}']
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Bhoi Joodidar',
        short_name: 'Bhoi Joodidar',
        description: "एक विश्वासार्ह व सुरक्षित विवाह जुळवणी मंच — Empowering Bhoi Community for Meaningful Marriages.",
        theme_color: '#DB2777',
        background_color: '#DB2777',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/lunch',
        id: '/lknkjgk65465464', // Add unique ID
        icons: [
          {
            src: '/android-chrome-192x192.png', // Use public folder paths
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          // Add more icon sizes for better compatibility
          {
            src: '/android-chrome-192x192.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: '/android-chrome-192x192.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: '/fevicon-32x32.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
    })
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'react-i18next'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
  },
  server: {
    host: true,
    allowedHosts: true,
  },
})