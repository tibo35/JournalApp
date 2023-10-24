export interface Task {
  id: string;
  content: string;
  date: string;
  description: string;
  categories: string[];
  cardId: string;
  status?: string;
}
