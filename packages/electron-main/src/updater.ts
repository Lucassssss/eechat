import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

export class AppUpdater {
  private mainWindow: BrowserWindow | null = null

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow

    // 配置自动更新
    autoUpdater.autoDownload = false
    autoUpdater.autoInstallOnAppQuit = true
    // 允许在开发环境下检查更新
    if (!app.isPackaged) {
      autoUpdater.forceDevUpdateConfig = true
    }
    this.initUpdate()
    this.bindEvents()
  }
  
  private updateAvailable: boolean = false

  private async initUpdate() {
    let serverList: { name: string; url: string }[] = [
      { name: '默认服务器', url: 'http://8.130.172.245/update/' }
    ];
  
    try {
      const res = await fetch('https://app.ee.chat/servers.json');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0 && data[0].url) {
        serverList = data;
      } else {
        console.warn('服务器列表格式错误或为空，使用默认地址');
      }
    } catch (err) {
      console.warn('远程服务器列表获取失败，使用默认地址：', err);
    }
  
    for (const server of serverList) {
      try {
        console.log(`尝试设置更新服务器：${server.name} (${server.url})`);
        autoUpdater.setFeedURL({
          provider: 'generic',
          url: server.url
        });
  
        await autoUpdater.checkForUpdates(); // 主动测试是否可访问
        console.log(`✅ 成功使用更新服务器：${server.name}, URL: ${server.url}`);
        break;
      } catch (e) {
        console.warn(`❌ 无法连接更新服务器 ${server.name}, URL: ${server.url} ，尝试下一个`);
      }
    }
  }

  // 绑定自动更新相关事件
  private bindEvents() {
    // 检查更新出错
    autoUpdater.on('error', (error) => {
      console.error('更新检查失败:', error)
      if (this.mainWindow) {
        this.mainWindow.webContents.send('update-error', error.message)
      }
    })

    // 检查到新版本
    autoUpdater.on('update-available', (info) => {
      console.info('检测到新版本:', info)
      this.updateAvailable = true
      if (this.mainWindow) {
        this.mainWindow.webContents.send('update-available', info)
      }
    })

    // 没有新版本
    autoUpdater.on('update-not-available', (info) => {
      console.log('当前已是最新版本:', info)
      this.updateAvailable = false
      if (this.mainWindow) {
        this.mainWindow.webContents.send('update-not-available', info)
      }
    })

    // 下载进度
    autoUpdater.on('download-progress', (progressObj) => {
      // console.log('下载进度:', progressObj)
      if (this.mainWindow) {
        this.mainWindow.webContents.send('download-progress', progressObj)
      }
    })

    // 下载完成
    autoUpdater.on('update-downloaded', (info) => {
      console.log('更新已下载:', info)
      if (this.mainWindow) {
        this.mainWindow.webContents.send('update-downloaded', info)
        
        // 提示用户是否立即安装
        // dialog.showMessageBox({
        //   type: 'info',
        //   title: '应用更新',
        //   message: '新版本已下载完成，是否立即安装？',
        //   buttons: ['立即安装', '稍后安装']
        // }).then(({ response }) => {
        //   if (response === 0) {
        //     autoUpdater.quitAndInstall(false, true)
        //   }
        // })
      }
    })
  }

  // 检查更新
  public async checkUpdate(): Promise<any> {
    try {
      console.log('开始检查更新')
      const res = await autoUpdater.checkForUpdates()
      console.log('检查更新结果:', res)  // 添加日志
      return {
        success: true,
        updateInfo: res?.updateInfo,
        versionInfo: {
          currentVersion: app.getVersion(),
          updateVersion: res?.updateInfo?.version
        }
      }
    } catch (err) {
      console.error('检查更新出错:', err)
      throw err
    }
  }

  // 下载更新
  public async downloadUpdate(): Promise<any> {
    try {
      console.log('开始下载更新')
      const res = await autoUpdater.downloadUpdate()
      return res
    } catch (err) {
      console.error('下载更新出错:', err)
      throw err
    }
  }

  // 安装更新
  public async installUpdate(): Promise<boolean> {
    try {
      const { response } = await dialog.showMessageBox({
        type: 'info',
        title: '应用更新',
        message: '新版本已下载完成，是否立即安装？',
        buttons: ['立即安装', '稍后安装'],
      })
      if (response === 0) {
        console.log('用户选择立即安装更新')
        setImmediate(() => {
          app.removeAllListeners('window-all-closed')
          if (this.mainWindow) {
            this.mainWindow.close()
          }
          autoUpdater.quitAndInstall(false)
        })
        return true
      } else {
        console.log('用户选择稍后安装')
        return false
      }
    } catch (err) {
      console.error('安装更新出错:', err)
      throw err
    }
  }
}

// 注册IPC处理程序
export function registerUpdaterHandlers(updater: AppUpdater) {
  // 检查更新 - 确保使用相同的事件名
  ipcMain.handle('check-update', async () => {
    try {
      const res = await updater.checkUpdate()
      console.log('IPC 返回结果:', res)  // 添加日志
      return res
    } catch (error) {
      console.log('检查更新失败:', error)
      return { success: false, message: error.message || '检查更新失败' }
    }
  })

  // 下载更新
  ipcMain.handle('download-update', async () => {
    try {
      await updater.downloadUpdate()
      return { success: true, message: '开始下载更新' }
    } catch (error) {
      console.error('下载更新失败:', error)
      return { success: false, message: error.message || '下载更新失败' }
    }
  })

  // 安装更新
  ipcMain.handle('install-update', async () => {
    try {
      await updater.installUpdate()
      return { success: true, message: '开始安装更新' }
    } catch (error) {
      console.error('安装更新失败:', error)
      return { success: false, message: error.message || '安装更新失败' }
    }
  })
}