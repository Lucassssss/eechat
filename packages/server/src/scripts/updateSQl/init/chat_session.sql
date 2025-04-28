/*
 Navicat Premium Dump SQL

 Source Server         : database
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 30/03/2025 02:03:26
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for chat_session
-- ----------------------------
DROP TABLE IF EXISTS "chat_session";
CREATE TABLE `chat_session` (`id` INTEGER PRIMARY KEY, `title` VARCHAR(100) NOT NULL DEFAULT '新对话', `uid` VARCHAR(50) NOT NULL, `model` VARCHAR(50) NOT NULL DEFAULT 'deepseek-r1', `system_prompt` TEXT DEFAULT 'You are a helpful assistant.', `temperature` FLOAT DEFAULT '0.6', `top_p` FLOAT DEFAULT '1', `presence_penalty` FLOAT DEFAULT '0', `frequency_penalty` FLOAT DEFAULT '0', `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, `deleted_at` DATETIME);

-- ----------------------------
-- Records of chat_session
-- ----------------------------
BEGIN;
INSERT INTO "chat_session" ("id", "title", "uid", "model", "system_prompt", "temperature", "top_p", "presence_penalty", "frequency_penalty", "created_at", "updated_at", "deleted_at") VALUES (1, '👋 Hi', 'default-user', 'deepseek-r1', 'You are a helpful assistant.', 0.6, 1.0, 0.0, 0.0, '2025-03-29 18:02:14.364 +00:00', '2025-03-29 18:02:14.364 +00:00', NULL);
COMMIT;

PRAGMA foreign_keys = true;
