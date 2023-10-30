import { Task } from "../../Tasks/taskTypes";
import { CategoryCounts } from "../../Category/categoryCountsInterface";

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
  tasksDoneWeekly: {
    Mon: number;
    Tue: number;
    Wed: number;
    Thu: number;
    Fri: number;
    Sat: number;
    Sun: number;
  };
};
