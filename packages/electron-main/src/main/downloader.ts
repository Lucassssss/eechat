import { app } from 'electron'
import path from 'path'
import fs from 'fs'
import { EventEmitter } from 'events'
import axios from 'axios'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'

/**
 * 下载任务状态枚举
 */
export enum DownloadStatus {
  PENDING = 'pending',    // 等待中
  DOWNLOADING = 'downloading', // 下载中
  PAUSED = 'paused',      // 已暂停
  COMPLETED = 'completed', // 已完成
  FAILED = 'failed',      // 失败
  CANCELED = 'canceled'   // 已取消
}

/**
 * 下载任务接口
 */
export interface DownloadTask {
  id: string;             // 任务唯一ID
  url: string;            // 下载URL
  destination: string;    // 保存路径
  filename: string;       // 文件名
  status: DownloadStatus; // 当前状态
  progress: number;       // 下载进度(0-100)
  speed: number;          // 下载速度(bytes/s)
  size: number;           // 文件总大小(bytes)
  downloaded: number;     // 已下载大小(bytes)
  error?: string;         // 错误信息
  createdAt: Date;        // 创建时间
  updatedAt: Date;        // 更新时间
}

/**
 * 下载工厂类 - 管理所有下载任务
 */
export class DownloadFactory extends EventEmitter {
  private static instance: DownloadFactory;
  private tasks: Map<string, DownloadTask> = new Map();
  private abortControllers: Map<string, AbortController> = new Map();
  
  /**
   * 私有构造函数，使用单例模式
   */
  private constructor() {
    super();
  }

  /**
   * 获取下载工厂实例
   * @returns DownloadFactory实例
   */
  public static getInstance(): DownloadFactory {
    if (!DownloadFactory.instance) {
      DownloadFactory.instance = new DownloadFactory();
    }
    return DownloadFactory.instance;
  }

  /**
   * 创建下载任务
   * @param url 下载URL
   * @param destination 保存目录
   * @param filename 可选，自定义文件名
   * @returns 下载任务ID
   */
  public createTask(url: string, destination: string, filename?: string): string {
    // 确保目标目录存在
    if (!existsSync(destination)) {
      mkdirSync(destination, { recursive: true });
    }

    // 如果未指定文件名，从URL中提取
    if (!filename) {
      filename = path.basename(url);
    }

    const fullPath = path.join(destination, filename);
    const id = uuidv4();
    
    const task: DownloadTask = {
      id,
      url,
      destination,
      filename,
      status: DownloadStatus.PENDING,
      progress: 0,
      speed: 0,
      size: 0,
      downloaded: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.tasks.set(id, task);
    this.emit('taskCreated', task);
    
    return id;
  }

  /**
   * 开始下载任务
   * @param id 任务ID
   * @returns 是否成功启动
   */
  public async startTask(id: string): Promise<boolean> {
    const task = this.tasks.get(id);
    if (!task) return false;

    if (task.status === DownloadStatus.DOWNLOADING) return true;
    
    task.status = DownloadStatus.DOWNLOADING;
    task.updatedAt = new Date();
    this.emit('taskUpdated', task);

    try {
      const controller = new AbortController();
      this.abortControllers.set(id, controller);

      const fullPath = path.join(task.destination, task.filename);
      const tempPath = `${fullPath}.download`;
      
      // 检查是否存在临时文件，用于断点续传
      let startByte = 0;
      if (existsSync(tempPath)) {
        const stats = fs.statSync(tempPath);
        startByte = stats.size;
      }

      // 获取文件信息
      const headResponse = await axios.head(task.url);
      const totalSize = parseInt(headResponse.headers['content-length'] || '0', 10);
      task.size = totalSize;

      // 设置下载请求
      const response = await axios({
        method: 'GET',
        url: task.url,
        responseType: 'stream',
        headers: startByte > 0 ? { Range: `bytes=${startByte}-` } : {},
        signal: controller.signal
      });

      // 更新任务总大小
      if (response.headers['content-length']) {
        if (startByte > 0) {
          task.size = startByte + parseInt(response.headers['content-length'], 10);
        } else {
          task.size = parseInt(response.headers['content-length'], 10);
        }
      }

      // 创建写入流
      const writer = createWriteStream(tempPath, { flags: startByte > 0 ? 'a' : 'w' });
      
      // 初始化进度追踪
      let downloaded = startByte;
      task.downloaded = downloaded;
      let lastBytes = downloaded;
      let lastTime = Date.now();
      
      // 定期更新下载速度
      const speedInterval = setInterval(() => {
        const now = Date.now();
        const timeDiff = (now - lastTime) / 1000; // 转换为秒
        const bytesDiff = task.downloaded - lastBytes;
        
        if (timeDiff > 0) {
          task.speed = Math.round(bytesDiff / timeDiff);
          lastBytes = task.downloaded;
          lastTime = now;
          
          this.emit('taskUpdated', task);
        }
      }, 1000);

      // 处理下载流
      return new Promise<boolean>((resolve) => {
        response.data.on('data', (chunk) => {
          downloaded += chunk.length;
          task.downloaded = downloaded;
          task.progress = Math.min(Math.round((downloaded / task.size) * 100), 100);
          task.updatedAt = new Date();
          
          this.emit('taskProgress', task);
        });

        response.data.pipe(writer);

        writer.on('finish', () => {
          clearInterval(speedInterval);
          
          // 重命名临时文件为最终文件
          fs.renameSync(tempPath, fullPath);
          fs.chmodSync(fullPath, 0o755)
          
          task.status = DownloadStatus.COMPLETED;
          task.progress = 100;
          task.speed = 0;
          task.updatedAt = new Date();
          
          this.abortControllers.delete(id);
          this.emit('taskCompleted', task);
          resolve(true);
        });

        writer.on('error', (err) => {
          clearInterval(speedInterval);
          
          task.status = DownloadStatus.FAILED;
          task.error = err.message;
          task.updatedAt = new Date();
          
          this.abortControllers.delete(id);
          this.emit('taskFailed', task);
          resolve(false);
        });

        response.data.on('error', (err) => {
          clearInterval(speedInterval);
          writer.end();
          
          // 如果不是用户取消导致的错误
          if (err.name !== 'AbortError') {
            task.status = DownloadStatus.FAILED;
            task.error = err.message;
            task.updatedAt = new Date();
            
            this.emit('taskFailed', task);
          }
          
          resolve(false);
        });
      });
    } catch (error) {
      task.status = DownloadStatus.FAILED;
      task.error = error.message;
      task.updatedAt = new Date();
      
      this.abortControllers.delete(id);
      this.emit('taskFailed', task);
      return false;
    }
  }

  /**
   * 暂停下载任务
   * @param id 任务ID
   * @returns 是否成功暂停
   */
  public pauseTask(id: string): boolean {
    const task = this.tasks.get(id);
    if (!task || task.status !== DownloadStatus.DOWNLOADING) return false;

    const controller = this.abortControllers.get(id);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(id);
    }

    task.status = DownloadStatus.PAUSED;
    task.speed = 0;
    task.updatedAt = new Date();
    
    this.emit('taskPaused', task);
    return true;
  }

  /**
   * 取消下载任务
   * @param id 任务ID
   * @returns 是否成功取消
   */
  public cancelTask(id: string): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;

    const controller = this.abortControllers.get(id);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(id);
    }

    // 删除临时文件
    const tempPath = path.join(task.destination, `${task.filename}.download`);
    if (existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch (error) {
        console.error(`Failed to delete temp file: ${error.message}`);
      }
    }

    task.status = DownloadStatus.CANCELED;
    task.speed = 0;
    task.updatedAt = new Date();
    
    this.emit('taskCanceled', task);
    return true;
  }

  /**
   * 删除下载任务
   * @param id 任务ID
   * @param deleteFile 是否同时删除已下载的文件
   * @returns 是否成功删除
   */
  public deleteTask(id: string, deleteFile: boolean = false): boolean {
    const task = this.tasks.get(id);
    if (!task) return false;

    // 如果任务正在下载，先取消
    if (task.status === DownloadStatus.DOWNLOADING) {
      this.cancelTask(id);
    }

    // 删除已下载的文件
    if (deleteFile && task.status === DownloadStatus.COMPLETED) {
      const filePath = path.join(task.destination, task.filename);
      if (existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.error(`Failed to delete file: ${error.message}`);
        }
      }
    }

    this.tasks.delete(id);
    this.emit('taskDeleted', id);
    return true;
  }

  /**
   * 获取所有下载任务
   * @returns 所有下载任务的数组
   */
  public getAllTasks(): DownloadTask[] {
    return Array.from(this.tasks.values());
  }

  /**
   * 获取指定任务
   * @param id 任务ID
   * @returns 下载任务对象或undefined
   */
  public getTask(id: string): DownloadTask | undefined {
    return this.tasks.get(id);
  }

  /**
   * 下载工具到bin目录的便捷方法
   * @param url 下载URL
   * @param filename 文件名
   * @returns 下载任务ID
   */
  public async downloadTool(url: string, filename: string): Promise<string> {
    const binPath = path.join(app.getPath('userData'), 'bin');
    
    // 创建bin目录（如果不存在）
    if (!existsSync(binPath)) {
      mkdirSync(binPath, { recursive: true });
    }
    
    // 创建下载任务
    const taskId = this.createTask(url, binPath, filename);
    
    // 开始下载
    this.startTask(taskId);
    
    return taskId;
  }
}

// 导出单例实例
export const downloader = DownloadFactory.getInstance();