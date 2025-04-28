class ToolCallMerger {
  constructor() {
    this.toolCallMap = new Map() // key: index, value: { id, name, arguments }
  }

  handleChunk(chunk) {
    const delta = chunk.choices && chunk.choices[0] && chunk.choices[0].delta
    const finishReason = chunk.choices && chunk.choices[0] && chunk.choices[0].finish_reason

    // 如果是 tool_calls 流段
    if (delta?.tool_calls) {
      for (const toolCall of delta.tool_calls) {
        const index = toolCall.index

        if (!this.toolCallMap.has(index)) {
          this.toolCallMap.set(index, {
            id: toolCall.id,
            name: toolCall.function?.name || '',
            arguments: '',
          })
        }

        const current = this.toolCallMap.get(index)

        // 更新 name（有些模型 name 也是流式分段）
        if (toolCall.function?.name) {
          current.name = toolCall.function.name
        }

        // 拼接参数
        if (toolCall.function?.arguments) {
          current.arguments += toolCall.function.arguments
        }
      }
    }

    // 判断是否是 tool_call 结束
    if (finishReason === 'tool_calls') {
      return this.getMergedToolCalls()
    }

    return null
  }

  getMergedToolCalls() {
    const merged = []
    for (const [, call] of this.toolCallMap.entries()) {
      let parsedArgs = {}
      try {
        parsedArgs = JSON.parse(call.arguments || '{}')
      } catch (e) {
        console.error('❌ 解析 tool_call.arguments 失败：', call.arguments)
      }

      merged.push({
        id: call.id,
        type: 'function',
        function: {
          name: call.name,
          arguments: parsedArgs,
        },
      })
    }

    return merged
  }

  reset() {
    this.toolCallMap.clear()
  }
}

module.exports = ToolCallMerger
