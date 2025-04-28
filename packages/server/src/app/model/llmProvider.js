module.exports = app => {
  const { STRING, BOOLEAN, DATE, INTEGER } = app.Sequelize
  const LLMProvider = app.model.define(
    'llm_provider',
    {
      id: {
        type: STRING,
        primaryKey: true,
        comment: '提供商ID',
      },
      name: {
        type: STRING,
        allowNull: false,
        comment: '提供商名称',
      },
      api_url: {
        type: STRING,
        comment: 'API基础地址',
      },
      official_url: {
        type: STRING,
        comment: '官方网站',
      },
      api_key_url: {
        type: STRING,
        comment: 'API密钥获取地址',
      },
      docs_url: {
        type: STRING,
        comment: '文档地址',
      },
      models_url: {
        type: STRING,
        comment: '模型列表地址',
      },
      state: {
        type: BOOLEAN,
        defaultValue: true,
        comment: '是否启用',
      },
      sort: {
        type: INTEGER,
        defaultValue: 99,
        comment: '排序',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    },
    {
      tableName: 'llm_providers',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  return LLMProvider
}
