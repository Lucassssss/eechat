module.exports = app => {
  const { INTEGER, STRING, DATE, FLOAT, TEXT } = app.Sequelize

  const ChatSession = app.model.define(
    'chat_session',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '会话ID',
      },
      title: {
        type: STRING(100),
        allowNull: false,
        defaultValue: '新对话',
        comment: '会话标题',
      },
      uid: {
        type: STRING(50),
        allowNull: false,
        comment: '用户ID',
      },
      model: {
        type: STRING(50),
        allowNull: false,
        defaultValue: 'deepseek-r1',
        comment: '使用的模型',
      },
      system_prompt: {
        type: TEXT,
        allowNull: true,
        defaultValue: 'You are a helpful assistant.',
        comment: '会话提示词',
      },
      temperature: {
        type: FLOAT,
        allowNull: true,
        defaultValue: 0.6,
        comment: '温度参数',
      },
      top_p: {
        type: FLOAT,
        allowNull: true,
        defaultValue: 1.0,
        comment: '采样阈值',
      },
      presence_penalty: {
        type: FLOAT,
        allowNull: true,
        defaultValue: 0.0,
        comment: '存在惩罚',
      },
      frequency_penalty: {
        type: FLOAT,
        allowNull: true,
        defaultValue: 0.0,
        comment: '频率惩罚',
      },
      created_at: {
        type: DATE,
        allowNull: false,
      },
      updated_at: {
        type: DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'chat_session',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  return ChatSession
}
