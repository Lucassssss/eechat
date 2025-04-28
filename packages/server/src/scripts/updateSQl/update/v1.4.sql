-- v1.4 升级脚本
-- 在chat_session表中添加model_id和model_config列

-- 添加model_id列
ALTER TABLE chat_session ADD COLUMN model_id TEXT;

-- 添加model_config列（用于存储模型配置JSON）
ALTER TABLE chat_session ADD COLUMN model_config TEXT;

-- 设置数据库版本
PRAGMA user_version = 104;