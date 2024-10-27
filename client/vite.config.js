import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, './src/components'),
      "@hooks": path.resolve(__dirname, './src/hooks'),
      "@services": path.resolve(__dirname, './src/services'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@utils": path.resolve(__dirname, './src/utils')
    }
  }
})
