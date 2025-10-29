import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // host: "0.0.0.0",
    fs: {
      strict: false
    },
    proxy: {
      '/api': "https://naturescure.vercel.app"
    }
  },
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Agar aap koi aur large packages use kar rahe hain to yahan add karein
          // example: 
          // ui: ['react-router-dom'],
          // utils: ['axios', 'lodash']
        }
      }
    }
  }
})