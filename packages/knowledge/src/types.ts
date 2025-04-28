export interface Document {
  id: string;
  title: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  text: string;
  metadata?: Record<string, any>;
}

export interface SearchResult {
  id: string;
  score: number;
  text: string;
  metadata?: Record<string, any>;
}