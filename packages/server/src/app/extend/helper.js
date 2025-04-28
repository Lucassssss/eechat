// electron/server/app/extend/helper.js
module.exports = {
  success(data = null, message = 'success') {
    return {
      code: 0,
      data,
      message,
    }
  },

  error(message = 'error', code = -1) {
    if(message instanceof Error) {
      message = message.message
    }
    return {
      code,
      data: null,
      message,
    }
  },

  // 流式错误返回
  streamError(ctx, error, sessionId) {
    ctx.set({
      'Content-Type': 'text/event-stream;charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })
    ctx.res.statusCode = 200

    const errorData = {
      code: 0,
      data: {
        content: `\`\`\` ${error} \`\`\``,
        sessionId,
      },
    }

    ctx.res.write(`data: ${JSON.stringify(errorData)}\n`)
    ctx.res.end()
  },

  toolCallStrArgsToObj(message, toolCallArguments) {
    if (message.arguments) {
      try {
        // 如果已经是对象，直接返回
        if (typeof message.arguments === 'object') {
          return message
        }

        // 尝试直接解析
        message.arguments = JSON.parse(message.arguments)
        return message
      } catch (error) {
        try {
          // 处理多个对象拼接的情况
          const jsonStr = message.arguments

          // 提取最后一个完整的 JSON 对象
          const matches = jsonStr.match(/\{[^{]*\}/g)
          if (matches && matches.length > 0) {
            // 使用最后一个匹配的对象
            message.arguments = JSON.parse(matches[matches.length - 1])
            return message
          }
          throw new Error('No valid JSON object found')
        } catch (e) {
          console.error('解析工具调用参数时出错:', e)
          return message
        }
      }
    }
    return message
  },

  toolCallFucntionToDirective(message, directive = 'tool_call') {
    if (message.choices[0].delta.content) {
      // 如果内容是对象，将其转换为格式化的JSON字符串
      const content =
        typeof message.choices[0].delta.content === 'object'
          ? JSON.stringify(message.choices[0].delta.content, null, 2)
          : message.choices[0].delta.content

      const str = `
:::${directive}{.${directive}}
${content}
:::
`
      message.choices[0].delta.content = str
      return message
    }
  },

  factoryMessageContent(content) {
    return {
      choices: [
        {
          delta: {
            content,
          },
        },
      ],
    }
  },
}
