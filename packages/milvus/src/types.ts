export interface SearchResult {
  id: number;
  distance: number;
  score: number;
}

export interface MilvusConfig {
  address: string;
  port: number;
  username?: string;
  password?: string;
}