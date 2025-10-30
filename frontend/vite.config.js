import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: { strict: false },
    proxy: {
      '/api': {
        target: 'https://naturescure.vercel.app',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // agar aur large packages ho to yahan add karo
        }
      }
    }
  },
  base: './', // ✅ Important: relative paths (404 fix)
})
