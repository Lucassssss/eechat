import { visit } from 'unist-util-visit'
import { h } from 'hastscript'
// import {h} from 'vue'
import { toString } from 'mdast-util-to-string'

export default function remarkPlugin() {
  return (tree: any) => {
    visit(tree, node => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name == 'tool_call') {
          const data = node.data || (node.data = {})
          const content = toString(node)

          // 提取工具信息，不使用 JSON.parse
          let toolInfo = { type: '', id: '', name: '', arguments: {} }
          let rawContent = content

          // 尝试提取基本信息
          const typeMatch = content.match(/"type"\s*:\s*"([^"]+)"/)
          const idMatch = content.match(/"id"\s*:\s*"([^"]+)"/)
          const nameMatch = content.match(/"name"\s*:\s*"([^"]+)"/)

          if (typeMatch) toolInfo.type = typeMatch[1]
          if (idMatch) toolInfo.id = idMatch[1]
          if (nameMatch) toolInfo.name = nameMatch[1]

          // 尝试安全解析完整 JSON，但不依赖它
          try {
            if (content.trim()) {
              const parsedInfo = JSON.parse(content)
              if (parsedInfo) {
                toolInfo = { ...toolInfo, ...parsedInfo }
              }
            }
          } catch (error) {
            // console.log('解析工具调用内容失败，使用正则提取的信息:', error)
          }

          // 显示名称处理
          const displayName = toolInfo.name
            ? toolInfo.name.replace(/^mcp_[^_]+_/, '')
            : '未知工具'

          data.hName = 'div'
          data.hProperties = {
            className:
              'tool-call-card my-2 border border-grey-900 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg overflow-hidden min-[500px]',
            'data-tool': toolInfo.name || '',
            'data-id': toolInfo.id || '',
          }
          data.hChildren = [
            // 工具信息头部
            h(
              'div',
              {
                class:
                  'flex space-x-4 items-center justify-between px-4 py-1 border-b border-blue-200 dark:border-blue-800',
              },
              [
                h('div', { class: 'flex items-center gap-1' }, [
                  h(
                    'span',
                    {
                      class:
                        'text-grey-600 dark:text-blue-400 font-mono text-sm font-bold',
                    },
                    '🛠️ ' + displayName,
                  ),
                  h(
                    'span',
                    { class: 'text-gray-400 dark:text-gray-200' },
                    '(' + (toolInfo.type || '工具调用') + ')',
                  ),
                ]),
                // 折叠按钮
                h(
                  'button',
                  {
                    class:
                      'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                    onclick:
                      'this.parentElement.nextElementSibling.classList.toggle("hidden")',
                  },
                  '详情',
                ),
              ],
            ),
            // 可折叠的详细内容
            h('div', { class: 'hidden p-3 text-sm' }, [
              h(
                'div',
                {
                  class:
                    'bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto break-all whitespace-pre-wrap',
                },
                // 显示原始内容，确保内容始终可见
                rawContent,
              ),
            ]),
          ]
        }
      }
    })
  }
}
