export default {
  title: 'eechat 官方文档',
  description: 'eechat 官方文档',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'eechat文档', link: '/guide/about' },
      { text: '官方网站', link: 'https://ee.chat' },
      { text: 'Github', link: 'https://github.com/Lucassssss/eechat' },
    ],
    sidebar: [
      // {
      //   text: '模型管理',
      //   items: [
      //     { text: 'API模型', link: '/model/api-model' },
      //     { text: '安装部署', link: '/guide/install' },
      //   ]
      // },
      // {
      //   text: 'API 文档',
      //   items: [
      //     { text: '用户接口', link: '/api/user' },
      //   ]
      // },
      {
        text: '开始',
        items: [
          { text: '简介', link: '/guide/about' },
          { text: '客户端下载', link: '/guide/download' },
          { text: '功能介绍', link: '/guide/preview' },
          { text: 'RoadMap', link: '/guide/roadmap' },
        ]
      },
      {
        text: '在其他平台使用',
        items: [
          { text: '硅基流动', link: '/model/use-in-siliconflow' },
        ]
      }
    ]
  }
}