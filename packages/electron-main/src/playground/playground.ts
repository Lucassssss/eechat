import { app, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { spawn } from 'node:child_process'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class Playground {
  constructor(win: Electron.BrowserWindow) {
    this.initIpc()
    // this.init()
  }
  llamaPath: string
  modelPath: string

  init(pathArg) {
    const isDev = process.env.NODE_ENV !== 'production'

    this.llamaPath = isDev
      ? path.join(__dirname, './bin/win/llama-server')
      : path.join(process.resourcesPath, 'bin/win/llama-server')

    // const modelPath = path.join(__dirname, "models", "your_model.gguf")
    // this.modelPath = `/Users/lucas/workspace/workspace/ai/deepseek/model/DeepSeek-R1-Distill-Qwen-7B-Q3_K_L.gguf`
    // this.modelPath = `/Users/lucas/workspace/workspace/ai/deepseek/model/gemma-3-4b-it-Q4_K_M.gguf`
    // this.modelPath = `/Users/lucas/workspace/workspace/ai/deepseek/model/qwq-32b-q4_k_m.gguf`
    this.modelPath = pathArg
    console.log('llamaPath', this.llamaPath)
    return {
      llamaPath: this.llamaPath,
      modelPath: this.modelPath,
    }
  }
  startLlamaServer(prompt) {
    return new Promise((resolve, reject) => {
      const llama = spawn(this.llamaPath, [
        '-m',
        this.modelPath,
        '--port',
        '11434',
      ])
      let response = ''
      llama.stdout.on('data', data => {
        response += data.toString()
        console.log(response)
        resolve(response)
      })
      llama.stderr.on('data', data => {
        console.error('LLaMA Error:', data.toString())
        reject('LLaMA Error:' + data.toString())
      })
      llama.on('close', () => resolve(response))
      resolve(true)
    })
  }
  initIpc() {
    ipcMain.handle('nodeLlamaCppInit', async (_, filePath) => {
      return this.init(filePath)
    })
    ipcMain.handle('nodeLlamaCppChat', async (_, input) => {
      const response = await this.startLlamaServer(input)
      return response
    })
  }
}

// import { app, ipcMain } from 'electron'
// import { getLlama, LlamaChatSession } from 'node-llama-cpp'
// import { fileURLToPath } from 'node:url'
// import path from 'node:path'

// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// export class Playground {
//   constructor(win: Electron.BrowserWindow) {
//     this.initIpc()
//     this.win = win
//     this.initIpcNodeLlamaCpp()
//   }
//   win: Electron.BrowserWindow

//   initIpc() {
//     console.log('initIpc')

//     ipcMain.handle('quit', () => {
//       console.log('ipc', 'quit')
//       this.quitApp()
//     })

//     ipcMain.handle('reload', () => {
//       console.log('ipc', 'reload')
//       this.reloadApp()
//     })
//   }

//   quitApp() {
//     app.quit()
//   }

//   reloadApp() {
//     this.win.webContents.reload()
//   }

//   session: LlamaChatSession

//   async nodeLlamaCppInit(filePath: string) {
//     console.log('filePath', filePath)

//     // const modelPath = path.join(__dirname, filePath)
//     const modelPath = `/Users/lucas/workspace/workspace/ai/deepseek/model/DeepSeek-R1-Distill-Qwen-7B-Q3_K_L.gguf`
//     console.log('modelPath', modelPath)
//     const llama = await getLlama()
//     const model = await llama.loadModel({
//       modelPath,
//     })
//     try {
//       const context = await model.createContext()
//       this.session = new LlamaChatSession({
//         contextSequence: context.getSequence(),
//       })
//     } catch (error) {
//       console.log(error)
//     }
//     // console.log('context', context)
//     // console.log('session', this.session)
//   }

//   async nodeLlamaCppChat(input: string) {
//     console.log('input', input)
//     try {
//       const response = await this.session.prompt(input)
//       console.log('response', response)
//       return response
//     } catch (error) {
//       console.log(error)
//       return error
//     }
//   }

// initIpcNodeLlamaCpp() {
//   ipcMain.handle('nodeLlamaCppInit', async (_, filePath) => {
//     await this.nodeLlamaCppInit(filePath)
//   })
//   ipcMain.handle('nodeLlamaCppChat', async (_, input) => {
//     const response = await this.nodeLlamaCppChat(input)
//     return response
//   })
// }
// }
