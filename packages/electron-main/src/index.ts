import { app, BrowserWindow, shell, ipcMain, screen } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'child_process'
import { AppUpdater, registerUpdaterHandlers } from './updater'
// import { registerLlamaHandlers } from './playground/nodeLlamaCpp'
import { Playground } from './playground/playground'
import { Analytics } from './analytics'
import { Ipc } from './ipc'
// import { KnowledgeBase } from '@eechat/knowledge'
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.isPackaged ? 'production' : 'development'
}

// import log from 'electron-log/main'
import log, { AppLog } from './utils/logger'

// 捕获未处理的异常
process.on('uncaughtException', error => {
  log.error('未捕获的异常:', error)
})

process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// Ensure single instance
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
app.commandLine.appendSwitch('enable-features', 'WebSpeechAPI')

let win: BrowserWindow | null = null
let updater: AppUpdater | null = null
// let nodeLlamaCpp: any
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const windowWidth = Math.min(1200, width * 0.8)
  const windowHeight = Math.min(800, height * 0.8)
  new Analytics()
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    width: windowWidth,
    height: windowHeight,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#00000000',
      symbolColor: '#666666',
      // height: 64,
    },
    webPreferences: {
      preload,
      webSecurity: false,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })

  win.setMenuBarVisibility(false)

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    if (!app.isPackaged) win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
  win.webContents.on('will-navigate', (event, url) => {
    // 阻止应用内导航
    if (url.startsWith('http:') || url.startsWith('https:')) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })
  // 初始化更新器
  // if (app.isPackaged) {
    updater = new AppUpdater(win)
    registerUpdaterHandlers(updater)
  // }
  // 保存返回的 llamaService 实例
  // const nodeLlamaCpp = registerLlamaHandlers()
  // console.log('Llama handlers registered successfully')
}

let appServer: any = null
const egg = require('egg')
async function startEggServer(pathArg): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    const isDev = process.env.NODE_ENV !== 'production'
    log.info('isDev:', isDev)
    const baseDir = isDev
      ? path.join(__dirname, '../../electron/server')
      : path.join(process.resourcesPath, 'app.asar.unpacked')
    // log.info('baseDir:', baseDir)
    try {
      appServer = await egg.start({
        baseDir: baseDir,
        // mode: 'single',
        // typescript: false,
      })
      appServer.listen(7002)
      log.info(`Server started on ${7002}`)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
async function stopEggServer(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      console.log(appServer)

      await appServer.close()
      console.log(`Server stoped`)
    } catch (error) {
      log.error(error)
      reject(error)
    }
  })
}

const initUpdate = () => {
  if (app.isPackaged && updater) {
    setTimeout(() => {
      updater.checkUpdate()
    }, 3000)
  }
}

// 在 app ready 时启动 EggJS
app.whenReady().then(async () => {
  try {
    console.log('[APP] app ready')
    createWindow()
    await startEggServer('')
    initUpdate()
    // const knowledgeBase = new KnowledgeBase()
    // await knowledgeBase.embedText('你好')
    const playground = new Playground(win)
  } catch (error) {
    console.error('Failed to start EggJS server:', error)
  }
})

// 在应用退出时关闭 EggJS 进程
app.on('window-all-closed', () => {
  // win = null
  console.log('window-all-closed')
  appServer.close()
  app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// 初始化 Ipc 实例
new Ipc()

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

ipcMain.handle('get-platform', () => {
  return process.platform
})

// ipcMain.handle('exec', async (_, command) => {
//   const { exec } = require('child_process')
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         reject(error)
//         return
//       }
//       resolve(stdout)
//     })
//   })
// })

// 添加打开外部链接的 handler
ipcMain.handle('open-external', (_, url) => {
  shell.openExternal(url)
})

// 添加打开下载页面的 handler
ipcMain.handle('open-url', (_, url) => {
  return shell.openExternal(url)
})

// 保存窗口原始状态
let originalBounds = null

// 处理迷你模式切换
ipcMain.handle('set-mini-mode', (event, isMini) => {
  console.log('set-mini-mode');
  
  // const win = BrowserWindow.fromWebContents(event.sender)
  // if (!win) return false
  
  if (isMini) {
    originalBounds = win.getBounds()
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const miniHeight = Math.floor(height * 2 / 3); // 屏幕高度的2/3
    const miniWidth = Math.floor(miniHeight * 350 / 700); // 按照350:700的比例计算宽度
    // win.setAlwaysOnTop(true)
    win.setMinimizable(false)
    win.setMaximizable(false)
    // win.setResizable(false)
    win.setSize(miniWidth, miniHeight)
    win.setPosition(width - miniWidth - 20, Math.floor((height - miniHeight) / 2))
    // win.setOpacity(0.96)
    return true
  } else {
    // 恢复原始窗口状态
    win.setAlwaysOnTop(false)
    win.setMinimizable(true)
    win.setMaximizable(true)
    win.setResizable(true)
    
    if (originalBounds) {
      win.setBounds(originalBounds)
      originalBounds = null
    } else {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize
      const windowWidth = Math.min(1200, width * 0.8)
      const windowHeight = Math.min(800, height * 0.8)
      // 先设置不透明度
      // win.setOpacity(1)
      // 计算居中位置
      const x = Math.floor((width - windowWidth) / 2)
      const y = Math.floor((height - windowHeight) / 2)
      win.setBounds({
        x: x,
        y: y,
        width: windowWidth,
        height: windowHeight
      })
    }
    return true
  }
})

// 处理窗口置顶状态切换
ipcMain.handle('toggle-always-on-top', (event) => {
  if (!win) return false
  
  const isAlwaysOnTop = win.isAlwaysOnTop()
  win.setAlwaysOnTop(!isAlwaysOnTop)
  
  return !isAlwaysOnTop
})

// startEggServer
ipcMain.handle('startEggServer', async (_, pathArg) => {
  try {
    const res = await startEggServer(pathArg)
    return res
  } catch (error) {
    console.error('Failed to start EggJS server:', error)
    return error
  }
})
// stopEggServer
ipcMain.handle('stopEggServer', async (_, pathArg) => {
  try {
    const res = await stopEggServer()
    return res
  } catch (error) {
    console.error('Failed to stop EggJS server:', error)
    return error
  }
})

app.on('render-process-gone', (event, webContents, details) => {
  console.error('渲染进程崩溃:', details.reason)
  app.exit()
})

// 添加更详细的错误处理
process.on('unhandledRejection', (reason, promise) => {
  log.error('未处理的 Promise 拒绝:- 原因:', reason);
  
  // 创建一个对话框显示错误
  // if (win) {
  //   const { dialog } = require('electron')
  //   dialog.showErrorBox(
  //     '应用程序错误',
  //     `发生未处理的错误:\n${reason instanceof Error ? reason.stack : String(reason)}`
  //   );
  // }
});
