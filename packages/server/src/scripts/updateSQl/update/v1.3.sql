-- v1.2 升级脚本
-- 在llm_config_providers表中添加描述列
-- SQLite语法添加列
ALTER TABLE llm_providers ADD COLUMN description TEXT;

-- 设置数据库版本
-- PRAGMA user_version = 102; -- 1.2版本

-- v1.3 升级脚本
-- 在llm_providers表中添加描述列并设置默认值
ALTER TABLE llm_providers ADD COLUMN description TEXT DEFAULT 'description';

-- 更新现有的空值记录
UPDATE llm_providers SET description = 'description' WHERE description IS NULL;

-- 设置数据库版本
PRAGMA user_version = 103;