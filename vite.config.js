import * as path from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

process.env.VITE_APP_VERSION = pkg.version
if (process.env.NODE_ENV === 'production') {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString()
}

export default defineConfig({
  plugins: [
    vue({
      script: {}
    }),
    Components({
      dirs: ['./src/components'],
      dts: true
    }),
    AutoImport({
      dts: './auto-imports.d.ts',
      defaultExportByFilename: false,
      vueTemplate: true,
      include: [
        /\.[tj]s?$/,
        /\.vue\??/,
        /\.mdx?$/
      ],
      dirs: [
        './src/composables/**',
        './src/composables',
        './src/utils/**',
        './src/utils'
      ],
      imports: [
        'vue'
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: false,
    target: 'es2018',
    format: 'cjs',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css')
            return '[name].css'
          return assetInfo.name
        }
      }
    }
  },
  test: {
    include: ['tests/**/*.test.ts', 'src/components/**/*.test.ts', 'src/composables/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue']
    }
  }
})
