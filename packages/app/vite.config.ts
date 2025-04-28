import fs from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import pkg from './package.json'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true })

  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  return {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [
      vue(),
      // electron({
      //   main: {
      //     // Shortcut of `build.lib.entry`
      //     entry: 'electron/main/index.ts',
      //     onstart({ startup }) {
      //       if (process.env.VSCODE_DEBUG) {
      //         console.log(
      //           /* For `.vscode/.debug.script.mjs` */ '[startup] Electron App',
      //         )
      //       } else {
      //         startup()
      //       }
      //     },
      //     vite: {
      //       build: {
      //         sourcemap,
      //         minify: isBuild,
      //         outDir: 'dist-electron/main',
      //         rollupOptions: {
      //           // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
      //           // we can use `external` to exclude them to ensure they work correctly.
      //           // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
      //           // Of course, this is not absolute, just this way is relatively simple. :)
      //           // external: Object.keys(
      //           //   'dependencies' in pkg ? pkg.dependencies : {},
      //           // ),
      //           external: [
      //             // 只排除无法打包的C++模块
      //             'sqlite3',
      //             'better-sqlite3',
      //             'node-gyp',
      //             'electron',
      //             'node-llama-cpp',
      //           ],
      //           output: {
      //             // 确保 require 语法可用
      //             format: 'cjs',
      //           },
      //           plugins: [
      //             {
      //               name: 'copy-server',
      //               writeBundle() {
      //                 const srcDir = path.join(__dirname, 'electron/server')
      //                 const destDir = path.join(
      //                   __dirname,
      //                   'dist-electron/server',
      //                 )
      //                 fs.cpSync(srcDir, destDir, {
      //                   recursive: true,
      //                   filter: src => {
      //                     // 排除 node_modules 和日志文件
      //                     return (
      //                       !src.includes('node_modules') &&
      //                       !src.endsWith('.log') &&
      //                       !src.includes('run') &&
      //                       !src.includes('.vercel') &&
      //                       !src.includes('.vscode') &&
      //                       !src.includes('run') &&
      //                       !src.includes('.vercel') &&
      //                       !src.includes('.vscode') &&
      //                       !src.includes('logs') &&
      //                       !src.includes('npm-debug.log') &&
      //                       !src.includes('yarn-error.log') &&
      //                       !src.includes('coverage') &&
      //                       !src.includes('.idea') &&
      //                       !src.includes('.DS_Store') &&
      //                       !src.endsWith('.sw') &&
      //                       !src.endsWith('.un~') &&
      //                       !src.includes('typings') &&
      //                       !src.includes('.nyc_output') &&
      //                       !src.includes('database') &&
      //                       !src.endsWith('.db')
      //                     )
      //                   },
      //                 })
      //               },
      //             },
      //             {
      //               name: 'copy-llama-cpp',
      //               writeBundle() {
      //                 const srcDir = path.join(__dirname, 'electron/main/bin')
      //                 const destDir = path.join(
      //                   __dirname,
      //                   'dist-electron/main/bin',
      //                 )
      //                 fs.cpSync(srcDir, destDir, {
      //                   recursive: true,
      //                 })
      //               },
      //             },
      //             {
      //               name: 'copy-package-json',
      //               writeBundle() {
      //                 // 复制 package.json 到 dist-electron 目录
      //                 const pkgPath = path.join(__dirname, 'package.json')
      //                 const destPath = path.join(
      //                   __dirname,
      //                   'dist-electron/package.json',
      //                 )
      //                 fs.copyFileSync(pkgPath, destPath)
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //   },
      //   preload: {
      //     // Shortcut of `build.rollupOptions.input`.
      //     // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
      //     input: 'electron/preload/index.ts',
      //     vite: {
      //       build: {
      //         sourcemap: sourcemap ? 'inline' : undefined, // #332
      //         minify: isBuild,
      //         outDir: 'dist-electron/preload',
      //         rollupOptions: {
      //           external: Object.keys(
      //             'dependencies' in pkg ? pkg.dependencies : {},
      //           ),
      //         },
      //       },
      //     },
      //   },
      //   // Ployfill the Electron and Node.js API for Renderer process.
      //   // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      //   // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      //   renderer: {},
      // }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server:
      process.env.VSCODE_DEBUG &&
      (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
        return {
          host: url.hostname,
          port: +url.port,
        }
      })(),
    clearScreen: false,
  }
})
