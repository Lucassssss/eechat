import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['cjs'],
    },
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
        chunkFileNames: '[name].cjs',
        preserveModules: true,
        preserveModulesRoot: 'src'
      },
      external: [
        'electron', 
        'node:url', 
        'node:path', 
        'node:module', 
        'node:os',
        'node:child_process',
        'events',
        'node:fs',
        'node:http',
        'fs',
      ]
    },
    emptyOutDir: true,
    reportCompressedSize: false,
    // rollupOptions: {
    //   output: {
    //     entryFileNames: '[name].js',
    //     chunkFileNames: '[name].js',
    //     assetFileNames: '[name].[ext]',
    //     preserveModules: true,
    //     preserveModulesRoot: 'src'
    //   },
    //   external: [
    //     'electron', 
    //     'node:url', 
    //     'node:path', 
    //     'node:module', 
    //     'node:os',
    //     'node:child_process',
    //     'events',
    //     'node:fs',
    //     'node:http',
    //     'fs',
    //   ]
    // }
  },
  resolve: {
    alias: {
      '@eechat': resolve(__dirname, '../../packages')
    }
  }
});