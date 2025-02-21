import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
        tailwindcss(),
  ],
  define: {
    'process.env': {
      MONGODB_URI: JSON.stringify(process.env.MONGODB_URI),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})