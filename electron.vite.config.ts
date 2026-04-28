import path from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPathPlugins from 'vite-tsconfig-paths'

const tsconfigPaths = tsconfigPathPlugins({
  projects: [path.resolve('tsconfig.json')]
})

export default defineConfig({
  main: {
    publicDir: path.resolve("resources"),
    plugins: [tsconfigPaths]
  },
  preload: {
    plugins: [tsconfigPaths]
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform)
    },
    server: {
      port: 4927
    },
    resolve: {
      alias: {
        '~': path.resolve('.'),
        '@renderer': path.resolve('src/renderer/src')
      }
    },
    plugins: [react(),  tailwindcss(), tsconfigPaths]
  }
})
