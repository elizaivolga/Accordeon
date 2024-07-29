import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    typescript: {
      typeCheck: true,
      tsConfig: {
        compilerOptions: {
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          esModuleInterop: true,
          typeRoots: ["./node_modules/@types", "./src/types"],
        }
      }
    },
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
