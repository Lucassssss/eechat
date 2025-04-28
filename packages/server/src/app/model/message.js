module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE } = app.Sequelize

  const Message = app.model.define(
    'message',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '消息ID',
      },
      session_id: {
        type: INTEGER,
        allowNull: false,
        comment: '关联的会话ID',
      },
      uid: {
        type: STRING(50),
        allowNull: false,
        comment: '用户ID',
      },
      role: {
        type: STRING(20),
        allowNull: false,
        comment: '角色(user/assistant/system)',
      },
      content: {
        type: TEXT,
        allowNull: false,
        comment: '消息内容',
      },
      model: {
        type: STRING(255),
        allowNull: true,
        comment: '模型名称',
      },
      usage: {
        type: TEXT,
        allowNull: true,
        comment: '使用情况',
      },
      object: {
        type: TEXT,
        allowNull: true,
        comment: '对象名称',
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
      tableName: 'message',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  // 定义关联关系
  // Message.associate = function () {
  //   app.model.Message.belongsTo(app.model.ChatSession, {
  //     foreignKey: 'session_id',
  //     as: 'session',
  //   })
  // }

  return Message
}
