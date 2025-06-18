import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import * as path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.svg', 'offline.html', 'sw.js'],
      manifest: {
        name: 'Rick and Morti',
        short_name: 'rick_morti',
        start_url: '/index.html',
        description: 'Progressive Web Application about Rick and Morti',
        display: 'standalone',
        id: 'https://rick-morti.web.app',
        background_color: '#ffffff',
        theme_color: '#42b883',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icons/icon-48.png',
            type: 'image/png',
            sizes: '48x48'
          },
          {
            src: '/icons/icon-72.png',
            type: 'image/png',
            sizes: '72x72'
          },
          {
            src: '/icons/icon-96.png',
            type: 'image/png',
            sizes: '96x96'
          },
          {
            src: '/icons/icon-128.png',
            type: 'image/png',
            sizes: '128x128'
          },
          {
            src: '/icons/icon-144.png',
            type: 'image/png',
            sizes: '144x144'
          },
          {
            src: '/icons/icon-152.png',
            type: 'image/png',
            sizes: '152x152'
          },
          {
            src: '/icons/icon-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/icons/icon-284.png',
            type: 'image/png',
            sizes: '284x284'
          },
          {
            src: '/icons/icon-512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/main.scss" as *;`
      }
    }
  }
});
