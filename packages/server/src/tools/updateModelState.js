// 更新模型状态脚本
// 1. 主流大模型
// 2. 嵌入模型默认禁用
// 3. 社区版本默认禁用
// 4. 小规模模型默认禁用
// 5. 预览版/实验性模型默认禁用

const fs = require('fs')
const path = require('path')

// 读取模型配置文件
const modelsPath = path.join(__dirname, './models.js')
const modelsContent = require(modelsPath)

// 判断模型是否为常用模型的规则
function shouldEnableModel(model) {
  const name = model.name?.toLowerCase() || ''
  const id = model.id?.toLowerCase() || ''
  const group = model.group?.toLowerCase() || ''

  // 1. 主流大模型
  if (
    id.includes('gpt-4') ||
    id.includes('claude-3') ||
    id.includes('gemini-pro') ||
    id.includes('deepseek-r1') ||
    id.includes('qwen-72b') ||
    id.includes('qwen2.5-72b')
  ) {
    return true
  }

  // 2. 嵌入模型默认禁用
  if (
    group.includes('embedding') ||
    group.includes('嵌入') ||
    name.includes('embedding') ||
    id.includes('embedding')
  ) {
    return false
  }

  // 3. 社区版本默认禁用
  if (name.includes('community') || id.includes('community')) {
    return false
  }

  // 4. 小规模模型默认禁用
  if (
    name.includes('-7b') ||
    name.includes('-1.5b') ||
    name.includes('-8b') ||
    name.includes('-9b')
  ) {
    return false
  }

  // 5. 预览版/实验性模型默认禁用
  if (
    name.includes('preview') ||
    name.includes('exp') ||
    name.includes('dev') ||
    name.includes('beta')
  ) {
    return false
  }

  return false
}

// 处理所有模型
Object.keys(modelsContent).forEach(provider => {
  const models = modelsContent[provider]
  if (Array.isArray(models)) {
    // 如果模型数量小于等于2个，全部启用
    if (models.length <= 2) {
      models.forEach(model => {
        model.state = true
      })
    } else {
      models.forEach(model => {
        if (!model.state) {
          model.state = shouldEnableModel(model)
        }
      })

      // 将启用的模型移到前面
      models.sort((a, b) => {
        if (a.state === b.state) return 0
        return a.state ? -1 : 1
      })
    }
  }
})

// 生成新的文件内容
const newContent = `// 此文件由 updateModelState.js 自动更新
// 最后更新时间: ${new Date().toLocaleString('zh-CN', {
  timeZone: 'Asia/Shanghai',
})}

module.exports = ${JSON.stringify(modelsContent, null, 2)}
`

// 写入文件
fs.writeFileSync(modelsPath, newContent, 'utf8')
console.log('✅ 模型状态已更新')
