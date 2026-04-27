import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    publicDir: resolve("resources")
  },
  preload: {},
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform)
    },
    server: {
      port: 4927
    },
    resolve: {
      alias: {
        '~': resolve('.'),
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react(),  tailwindcss()]
  }
})
