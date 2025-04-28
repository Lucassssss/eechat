module.exports = app => {
  const { STRING, INTEGER, TEXT, JSON, DATE } = app.Sequelize

  const LocalOllamaModels = app.model.define(
    'local_ollama_models',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING(500),
        allowNull: false,
        comment: '模型名称',
      },
      description: {
        type: TEXT,
        comment: '模型描述',
      },
      capabilities: {
        type: JSON,
        comment: '模型能力标签',
      },
      sizes: {
        type: JSON,
        comment: '模型大小选项',
      },
      sort: {
        type: INTEGER,
        defaultValue: 0,
        comment: '排序',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    },
    {
      tableName: 'local_ollama_models',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  return LocalOllamaModels
}
