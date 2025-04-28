import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import path from 'path'
import fs from 'fs'
// 引入下载工厂
import { downloader, DownloadStatus } from './downloader'

export class Ipc {
  constructor() {
    this.init()
  }

  private getToolFilename(name: string): string {
    return process.platform === 'win32' ? `${name}.exe` : name
  }


  private init() {
    ipcMain.handle('get-app-version', () => {
      return app.getVersion()
    })

    // 获取各种路径
    ipcMain.handle('get-app-paths', () => {
      const userData = app.getPath('userData')
      return {
        config: path.join(userData, 'config'),
        database: path.join(userData, 'database'),
        executable: path.join(userData, 'bin'),
        logs: path.join(userData, 'logs')
      }
    })

    // 获取MCP配置文件的完整路径
    ipcMain.handle('get-mcp-config-path', () => {
      const configDir = path.join(app.getPath('userData'), 'config')
      const configFile = path.join(configDir, 'mcp.config.json')
      return configFile
    })
    
    // 打开目录
    ipcMain.handle('open-directory', (_, dirPath) => {
      if (fs.existsSync(dirPath)) {
        shell.openPath(dirPath)
      } else {
        throw new Error(`目录不存在: ${dirPath}`)
      }
    })
    
    // 检查工具是否安装
    ipcMain.handle('check-tool', (_, name: string) => {
      const binPath = path.join(app.getPath('userData'), 'bin')
      const toolPath = path.join(binPath, this.getToolFilename(name))
      return fs.existsSync(toolPath)
    })

    // 获取工具文件名
    ipcMain.handle('get-tool-filename', (_, name: string) => {
      return this.getToolFilename(name)
    })

    // 获取所有下载任务
    ipcMain.handle('get-download-tasks', () => {
      return downloader.getAllTasks();
    });

    // 获取单个下载任务
    ipcMain.handle('get-download-task', (_, id: string) => {
      return downloader.getTask(id);
    });

    // 创建下载任务
    ipcMain.handle('create-download-task', (_, url: string, destination: string, filename?: string) => {
      return downloader.createTask(url, destination, filename);
    });

    // 开始下载任务
    ipcMain.handle('start-download-task', (_, id: string) => {
      return downloader.startTask(id);
    });

    // 暂停下载任务
    ipcMain.handle('pause-download-task', (_, id: string) => {
      return downloader.pauseTask(id);
    });

    // 取消下载任务
    ipcMain.handle('cancel-download-task', (_, id: string) => {
      return downloader.cancelTask(id);
    });

    // 删除下载任务
    ipcMain.handle('delete-download-task', (_, id: string, deleteFile: boolean = false) => {
      return downloader.deleteTask(id, deleteFile);
    });

    // 下载工具
    ipcMain.handle('download-tool', async (_, name: string) => {
      try {
        const filename = process.platform === 'win32' ? `${name}.exe` : name;
        const url = `http://8.130.172.245/bin/${process.platform}/${filename}`
        console.log('下载工具:', url);
        // 创建下载任务并返回任务ID
        const taskId = await downloader.downloadTool(url, filename);
        
        // 监听任务完成事件
        return new Promise((resolve, reject) => {
          const onComplete = (task) => {
            if (task.id === taskId) {
              downloader.removeListener('taskCompleted', onComplete);
              downloader.removeListener('taskFailed', onFailed);
              resolve(true);
            }
          };
          
          const onFailed = (task) => {
            if (task.id === taskId) {
              downloader.removeListener('taskCompleted', onComplete);
              downloader.removeListener('taskFailed', onFailed);
              reject(new Error(task.error || '下载失败'));
            }
          };
          
          downloader.on('taskCompleted', onComplete);
          downloader.on('taskFailed', onFailed);
        });
      } catch (error) {
        throw new Error(`下载工具失败: ${error.message}`);
      }
    });
    
    // 读取MCP配置文件
    ipcMain.handle('read-mcp-config', async () => {
      try {
        const configDir = path.join(app.getPath('userData'), 'config')
        const configFile = path.join(configDir, 'mcp.config.json')
        
        // 确保配置目录存在
        if (!fs.existsSync(configDir)) {
          fs.mkdirSync(configDir, { recursive: true })
        }
        
        // 如果配置文件不存在，创建默认配置
        if (!fs.existsSync(configFile)) {
          const defaultConfig = {
            "mcpServers": {
              "default": {
                "command": "npx",
                "args": ["@modelcontextprotocol/server", "start"],
                "enabled": true
              }
            }
          }
          fs.writeFileSync(configFile, JSON.stringify(defaultConfig, null, 2), 'utf8')
        }
        
        // 读取配置文件
        const content = fs.readFileSync(configFile, 'utf8')
        return content
      } catch (error) {
        console.error('读取MCP配置文件失败:', error)
        throw new Error(`读取配置文件失败: ${error.message}`)
      }
    })
    
    // 保存MCP配置文件
    ipcMain.handle('save-mcp-config', async (_, content: string) => {
      try {
        const configDir = path.join(app.getPath('userData'), 'config')
        const configFile = path.join(configDir, 'mcp.config.json')
        
        // 确保配置目录存在
        if (!fs.existsSync(configDir)) {
          fs.mkdirSync(configDir, { recursive: true })
        }
        
        // 验证JSON格式
        JSON.parse(content)
        
        // 保存配置文件
        fs.writeFileSync(configFile, content, 'utf8')
        return true
      } catch (error) {
        console.error('保存MCP配置文件失败:', error)
        throw new Error(`保存配置文件失败: ${error.message}`)
      }
    })
    
    // 重启MCP服务器
    ipcMain.handle('restart-mcp-server', async () => {
      try {
        // 这里需要调用后端的重启方法
        // 假设我们有一个全局的egg实例可以访问
        if (global.eggApp && global.eggApp.messenger) {
          global.eggApp.messenger.sendToApp('restart-mcp-server')
          return true
        }
        return false
      } catch (error) {
        console.error('重启MCP服务器失败:', error)
        throw new Error(`重启服务器失败: ${error.message}`)
      }
    })
  }
}