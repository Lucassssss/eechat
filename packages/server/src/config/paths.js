const path = require('path')
const os = require('os')

// 获取应用数据目录
function getAppDataPath() {
  // 如果是在 Electron 环境中
  if (process.type === 'browser' || process.type === 'renderer') {
    const { app } = require('electron')
    return app.getPath('userData')
  }
  
  // 如果是在独立的 EggJS 环境中
  const appName = 'eechat'
  switch (process.platform) {
    case 'win32':
      return path.join(process.env.APPDATA, appName)
    case 'darwin':
      return path.join(os.homedir(), 'Library', 'Application Support', appName)
    case 'linux':
      return path.join(os.homedir(), '.config', appName)
    default:
      return path.join(os.homedir(), '.'+appName)
  }
}

module.exports = {
  appDataPath: getAppDataPath(),
  databasePath: path.join(getAppDataPath(), 'database', 'database.db'),
  logsPath: path.join(getAppDataPath(), 'logs'),
  binPath: path.join(getAppDataPath(), 'bin'),
  configPath: path.join(getAppDataPath(), 'config'),
}