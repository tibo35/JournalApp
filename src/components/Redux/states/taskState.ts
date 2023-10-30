import { Task } from "../../Tasks/taskTypes";
import { CategoryCounts } from "../slices/taskSlice";

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
  taskStatusCountsByCard: { [cardId: string]: { [status: string]: number } };
  tasksForTodayCount: number;
  doneTasksCount: number;
};
