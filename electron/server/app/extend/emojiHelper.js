// electron/server/app/extend/emojiHelper.js

/**
 * 根据对话内容生成匹配的 emoji
 * @param {string} content - 对话内容或标题
 * @returns {string} - 匹配的 emoji
 */
exports.getEmojiForTitle = (title) => {
  if (!title) return '💬';
  
  // 关键词到 emoji 的映射
  const keywordMap = {
    // 技术相关
    '代码': '💻', '编程': '👨‍💻', '开发': '⚙️', '软件': '📊', '硬件': '🔌',
    '网络': '🌐', '数据': '📈', 'AI': '🤖', '人工智能': '🧠', '机器学习': '📊',
    'code': '💻', 'programming': '👨‍💻', 'software': '📊', 'data': '📈',
    
    // 学习相关
    '学习': '📚', '教育': '🎓', '课程': '📝', '知识': '💡', '研究': '🔬',
    '分析': '📊', '理解': '🧩', '思考': '🤔', 'learn': '📚', 'study': '📝',
    
    // 创意相关
    '创意': '💡', '设计': '🎨', '艺术': '🖼️', '音乐': '🎵', '绘画': '🖌️',
    '写作': '✍️', '创作': '🎭', '灵感': '✨', 'creative': '💡', 'design': '🎨',
    
    // 商务相关
    '工作': '💼', '会议': '👥', '项目': '📋', '计划': '📅', '报告': '📊',
    '市场': '📈', '销售': '💰', '客户': '🤝', 'work': '💼', 'business': '💼',
    
    // 日常生活
    '日常': '🏠', '家庭': '👨‍👩‍👧', '购物': '🛒', '饮食': '🍽️', '交通': '🚗',
    '生活': '🌞', '家务': '🧹', '休息': '🛌', 'daily': '📆', 'life': '🌞',
    
    // 健康相关
    '健康': '🏥', '医疗': '⚕️', '疾病': '🤒', '药物': '💊', '锻炼': '🏋️',
    '饮食': '🥗', '营养': '🥦', '睡眠': '😴', 'health': '❤️', 'medical': '🏥',
    
    // 娱乐相关
    '游戏': '🎮', '电影': '🎬', '电视': '📺', '娱乐': '🎭', '休闲': '🎯',
    '爱好': '🎨', 'game': '🎮', 'movie': '🎬', 'entertainment': '🎭',
    
    // 旅行相关
    '旅行': '✈️', '旅游': '🗺️', '度假': '🏖️', '探险': '🧗', '景点': '🏞️',
    '酒店': '🏨', '航班': '✈️', '行程': '🗓️', 'travel': '✈️', 'tour': '🗺️',
    
    // 情感相关
    '快乐': '😊', '悲伤': '😢', '愤怒': '😡', '恐惧': '😱', '爱情': '❤️',
    '友谊': '🤝', '情感': '💕', '心情': '😌', 'happy': '😊', 'sad': '😢',
    
    // 默认关键词
    '聊天': '💬', '对话': '🗣️', '问答': '❓', '新对话': '🆕', '帮助': '🆘',
    '问题': '❓', '解答': '💡', '咨询': '📞', 'chat': '💬', 'question': '❓'
  };
  
  // 默认 emoji 列表，当没有匹配关键词时使用
  const defaultEmojis = [
    '💬', '🤖', '🔮', '✨', '🌟', '🌈', '🚀', '🎯', '🎪', '🎭', 
    '🎁', '🎊', '🎉', '🏆', '🎸', '🎧', '📱', '💻', '🌐', '📚'
  ];
  
  // 检查标题中是否包含关键词
  for (const [keyword, emoji] of Object.entries(keywordMap)) {
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      return emoji;
    }
  }
  
  // 如果没有匹配的关键词，使用标题的第一个字符生成一致的 emoji
  const charCode = title.charCodeAt(0);
  return defaultEmojis[charCode % defaultEmojis.length];
};

/**
 * 为标题添加 emoji 前缀
 * @param {string} title - 原始标题
 * @returns {string} - 带有 emoji 前缀的标题
 */
exports.addEmojiToTitle = (title) => {
  if (!title) return '💬 新对话';
  
  const emoji = exports.getEmojiForTitle(title);
  return `${emoji} ${title}`;
};