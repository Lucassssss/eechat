const egg = require('egg')

async function startEggServer(pathArg) {
  return new Promise(async (resolve, reject) => {
    const isDev = process.env.NODE_ENV !== 'production'
    // log.info('isDev:', isDev)
    // const baseDir = isDev
    //   ? path.join(__dirname, '../../electron/server')
    //   : path.join(process.resourcesPath, 'app.asar.unpacked')
    // // log.info('baseDir:', baseDir)
    try {
      appServer = await egg.start({
        baseDir: __dirname,
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

startEggServer()
