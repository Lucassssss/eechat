-- v1.2 升级脚本
-- 在llm_config_providers表中添加描述列
-- SQLite语法添加列
ALTER TABLE llm_providers ADD COLUMN description TEXT;

-- 设置数据库版本
-- PRAGMA user_version = 102; -- 1.2版本