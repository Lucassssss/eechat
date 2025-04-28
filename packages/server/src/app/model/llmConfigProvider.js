module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE, BOOLEAN } = app.Sequelize

  const llmConfigProvider = app.model.define(
    'llm_config_provider',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '配置ID',
      },
      uid: {
        type: STRING(50),
        allowNull: false,
        comment: '用户ID',
      },
      provider_id: {
        type: STRING,
        allowNull: false,
        comment: '提供商ID',
      },
      api_key: {
        type: TEXT,
        allowNull: false,
        comment: '加密的API密钥',
      },
      base_url: {
        type: STRING,
        allowNull: true,
        comment: '自定义API基础地址',
      },
      state: {
        type: BOOLEAN,
        defaultValue: false,
        comment: '是否开启',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    },
    {
      tableName: 'llm_config_provider',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  return llmConfigProvider
}
