import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
})

// --------- Preload scripts loading ---------
function domReady(
  condition: DocumentReadyState[] = ['complete', 'interactive'],
) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      return parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      return parent.removeChild(child)
    }
  },
}

// 使用SVG作为加载图标，不使用动画以提高效率
function useLoading() {
  const styleContent = `
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #999;
  z-index: 9;
}
.app-loading-icon {
  color: white;
  width: 50px;
  height: 50px;
}
  `
  const oStyle = document.createElement('style')
  const oDiv = document.createElement('div')

  oStyle.id = 'app-loading-style'
  oStyle.innerHTML = styleContent
  oDiv.className = 'app-loading-wrap'

  // 使用提供的SVG作为加载图标
  oDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64.000000" height="64.000000" viewBox="0 0 1024 1024" fill="none">
	<defs/>
	<rect id="矩形 4" y="0.000031" rx="180.000000" width="1024.000000" height="1024.000000" fill="#000000" fill-opacity="1.000000"/>
	<rect id="矩形 1" x="192.000000" y="200.000061" rx="5.000000" width="399.333344" height="73.333336" fill="#FFFFFF" fill-opacity="1.000000"/>
	<rect id="矩形 2" x="192.000000" y="332.000031" rx="5.000000" width="399.333344" height="73.333336" fill="#FFFFFF" fill-opacity="1.000000"/>
	<rect id="矩形 3" x="192.000244" y="464.000031" rx="5.000000" width="245.589996" height="73.333336" fill="#FFFFFF" fill-opacity="1.000000"/>
</svg>`

  return {
    appendLoading() {
      safeDOM.append(document.head, oStyle)
      safeDOM.append(document.body, oDiv)
    },
    removeLoading() {
      safeDOM.remove(document.head, oStyle)
      safeDOM.remove(document.body, oDiv)
    },
  }
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}

// 减少超时时间以加快启动速度
setTimeout(removeLoading, 5000)

// 通知主进程预加载完成
ipcRenderer.send('preload-ready')