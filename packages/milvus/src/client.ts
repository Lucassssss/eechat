import { MilvusClient, RowData } from '@zilliz/milvus2-sdk-node';

export class MilvusManager {
  private client: MilvusClient;

  constructor(address: string = 'localhost:19530') {
    this.client = new MilvusClient(address);
  }

  async createCollection(collectionName: string, dimension: number) {
    try {
      await this.client.createCollection({
        collection_name: collectionName,
        dimension,
        metric_type: 'L2'
      });
    } catch (error) {
      console.error('创建集合失败:', error);
      throw error;
    }
  }

  async insert(collectionName: string, vectors: number[][]) {
    try {
      const rowData: RowData[] = vectors.map(vector => ({
        vector_field: vector
      }));

      await this.client.insert({
        collection_name: collectionName,
        data: rowData
      });
    } catch (error) {
      console.error('插入向量失败:', error);
      throw error;
    }
  }

  async search(collectionName: string, vector: number[], topK: number = 5) {
    try {
      const result = await this.client.search({
        collection_name: collectionName,
        vector,
        topk: topK
      });
      return result;
    } catch (error) {
      console.error('搜索向量失败:', error);
      throw error;
    }
  }
}