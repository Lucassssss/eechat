module.exports = app => {
  const { INTEGER, STRING, TEXT, DATE, BOOLEAN } = app.Sequelize

  const LlmConfigModel = app.model.define(
    'llm_config_model',
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
      model_id: {
        type: STRING,
        allowNull: false,
        comment: '模型ID',
      },
      state: {
        type: BOOLEAN,
        defaultValue: true,
        comment: '是否开启',
      },
      name: {
        type: STRING,
        allowNull: false,
        comment: '模型名称',
      },
      group_name: {
        type: STRING,
        comment: '模型分组',
      },
      parameters: {
        type: TEXT,
        allowNull: true,
        defaultValue: '{}',
        comment: '模型参数JSON',
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    },
    {
      tableName: 'llm_config_model',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  return LlmConfigModel
}
