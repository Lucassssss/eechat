# @eechat/milvus

Milvus 矢量数据库集成模块，用于处理向量存储和检索功能。

## 功能

- 向量数据库连接管理
- 集合创建和管理
- 向量插入和检索
- 相似度搜索

## 使用方法

```typescript
import { MilvusManager } from '@eechat/milvus';

const milvus = new MilvusManager('localhost:19530');

// 创建集合
await milvus.createCollection('my_collection', 128);

// 插入向量
const vectors = [[0.1, 0.2, ...], [0.3, 0.4, ...]];
await milvus.insert('my_collection', vectors);

// 搜索相似向量
const searchVector = [0.1, 0.2, ...];
const results = await milvus.search('my_collection', searchVector, 5);