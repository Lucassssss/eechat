module.exports = app => {
  const { STRING, BOOLEAN, INTEGER, DATE } = app.Sequelize

  const LLMModel = app.model.define(
    'llm_model',
    {
      id: {
        type: STRING,
        primaryKey: true,
        comment: '模型ID',
      },
      provider_id: {
        type: STRING,
        allowNull: false,
        comment: '提供商ID',
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
      state: {
        type: BOOLEAN,
        defaultValue: false,
        comment: '是否启用',
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
      tableName: 'llm_models',
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  )

  return LLMModel
}
