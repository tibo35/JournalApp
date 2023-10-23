import { Task } from "./taskTypes";
import { CategoryCounts } from "../Redux/slices/taskSlice";

export type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: null | string;
  categoryCount?: CategoryCounts;
  taskCountsByCard: { [cardId: string]: number };
  categoryCountsByCard: { [cardId: string]: CategoryCounts };
  totalCategoryCounts: {
    [categoryName: string]: number;
  };
  totalTasksCount: number;
};
