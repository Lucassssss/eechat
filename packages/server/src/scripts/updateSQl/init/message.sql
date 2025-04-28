/*
 Navicat Premium Dump SQL

 Source Server         : database
 Source Server Type    : SQLite
 Source Server Version : 3045000 (3.45.0)
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3045000 (3.45.0)
 File Encoding         : 65001

 Date: 14/03/2025 22:04:39
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS "message";
CREATE TABLE "message" (
  "id" INTEGER,
  "session_id" INTEGER NOT NULL,
  "uid" VARCHAR(50) NOT NULL,
  "role" VARCHAR(20) NOT NULL,
  "content" TEXT NOT NULL,
  "model" VARCHAR(255),
  "usage" TEXT,
  "object" TEXT,
  "created_at" DATETIME NOT NULL,
  "updated_at" DATETIME NOT NULL,
  "deleted_at" DATETIME,
  PRIMARY KEY ("id")
);

-- ----------------------------
-- Records of message
-- ----------------------------
INSERT INTO "message" VALUES (1, 1, 'default-user', 'user', 'Hi 👋 ', NULL, NULL, NULL, '2025-03-14 14:03:43.159 +00:00', '2025-03-14 14:03:43.159 +00:00', NULL);
INSERT INTO "message" VALUES (2, 1, 'default-user', 'assistant', '<think></think>Hello! How can I assist you today? 😊', NULL, NULL, NULL, '2025-03-14 14:03:43.163 +00:00', '2025-03-14 14:03:43.163 +00:00', NULL);

PRAGMA foreign_keys = true;
