function collectModelData() {
  const models = []

  document.querySelectorAll('li[x-test-model]').forEach(li => {
    // 基本信息
    const title = li.querySelector('[x-test-model-title]').getAttribute('title')
    const description = li.querySelector('p.max-w-lg')?.textContent?.trim()

    // 获取所有模型尺寸
    const sizes = Array.from(li.querySelectorAll('[x-test-size]')).map(span =>
      span.textContent.trim(),
    )

    // 获取能力标签
    const capabilities = Array.from(
      li.querySelectorAll('[x-test-capability]'),
    ).map(span => span.textContent.trim())

    // 获取统计信息
    const pullCount = li
      .querySelector('[x-test-pull-count]')
      ?.textContent?.trim()
    const tagCount = li.querySelector('[x-test-tag-count]')?.textContent?.trim()
    const updated = li.querySelector('[x-test-updated]')?.textContent?.trim()

    // 构建模型对象
    const model = {
      name: title,
      description,
      capabilities, // 新增能力标签
      sizes,
      stats: {
        pulls: pullCount,
        tags: tagCount,
        lastUpdated: updated,
      },
    }

    models.push(model)
  })

  console.log(JSON.stringify(models, null, 2))
  return models
}

// 运行收集
collectModelData()
