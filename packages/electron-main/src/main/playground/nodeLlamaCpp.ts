// import { getLlama, LlamaChatSession, type LlamaContext, type LlamaModel } from 'node-llama-cpp'
// import { app, ipcMain } from 'electron'
// import path from 'node:path'
// import { fileURLToPath } from 'node:url'
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

// class NodeLlamaCpp {
//   private llama: any = null;
//   private model: LlamaModel | null = null;
//   private context: LlamaContext | null = null;
//   private session: LlamaChatSession | null = null;

//   constructor() {
//     this.initialize = this.initialize.bind(this);
//     this.chat = this.chat.bind(this);
//   }

//   async initialize(modelPath: string) {
//     try {
//       this.llama = await getLlama({
//         gpu: "vulkan"
//       });
//       console.log("GPU type:", this.llama.gpu);
//       const modelPath = path.join('D:/ai/models/GGUF/DeepSeek-R1-Distill-Qwen-1.5B-Q2_K.gguf')
//       console.log(modelPath);
//       this.model = await this.llama.loadModel({
//         modelPath,
//         // contextSize: 4096,
//         // gpuLayers: 0
//       });
      
//       this.context = await this.model.createContext();
//       this.session = new LlamaChatSession({
//         contextSequence: this.context.getSequence(),
//         // temperature: 0.7,
//         // topP: 0.95
//       });
      
//       return { success: true };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   }

//   async chat(message: string) {
//     if (!this.session) {
//       throw new Error('Model not initialized');
//     }
//     try {
//       const response = await this.session.prompt(message);
//       return response;
//     } catch (error) {
//       throw new Error(`Chat error: ${error.message}`);
//     }
//   }

//   async cleanup() {
//     if (this.session) {
//       this.session = null;
//     }
//     if (this.context) {
//       await this.context.free();
//       this.context = null;
//     }
//     if (this.model) {
//       await this.model.free();
//       this.model = null;
//     }
//   }
// }

// export function registerLlamaHandlers() {
//   const llamaService = new NodeLlamaCpp();

//   ipcMain.handle('llama-initialize', async (_, modelPath) => {
//     console.log('llama-initialize');
//     return await llamaService.initialize(modelPath);
//   });

//   ipcMain.handle('llama-chat', async (_, message) => {
//     return await llamaService.chat(message);
//   });

//   app.on('before-quit', async () => {
//     await llamaService.cleanup();
//   });
  
//   // 返回 llamaService 实例，以便在主进程中可以直接使用
//   return llamaService;
// }