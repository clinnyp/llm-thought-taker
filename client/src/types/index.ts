export interface Note {
  id: string;
  userId: string;
  user?: {
    id: string;
    name: string;
  };
  title: string;
  prompt: string;
  content: string;
  createdAt: Date;
} 