import {
  AllTasksByCard,
  CreateTask as createTaskAPI,
  UpdateTask as updateTaskAPI,
  DeleteTask as deleteTaskAPI,
  AllCategoryByCard,
  AllCategory,
  AllTasks,
  TasksDueToday,
  TasksDoneToday,
} from "../../../Api/TasksAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../Tasks/taskTypes";
import { CategoryCounts } from "../../Category/categoryCountsInterface";
import { TaskState } from "../states/taskState";
interface DeleteTaskPayload {
  taskId: string;
  cardId: string;
  category?: keyof CategoryCounts;
}

export const allTasksByCardThunk = createAsyncThunk(
  "tasks/fetchTasksByCardId",
  async (cardId: string) => {
    const response = await AllTasksByCard(cardId);
    return { tasks: response, cardId };
  }
);
export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (taskData: {
    content: string;
    date: string;
    cardId: string;
    description: string;
    categories?: string[];
    status: string;
  }) => {
    const { content, date, cardId, description, categories, status } = taskData;
    const response = await createTaskAPI(
      content,
      date,
      cardId,
      description,
      categories,
      status
    );
    return response;
  }
);

// Async thunk for updating a task
export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    const response = await updateTaskAPI(updatedTask);
    return response;
  }
);

// Async thunk for deleting a task
export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (taskData: DeleteTaskPayload) => {
    const { taskId, cardId, category } = taskData;
    await deleteTaskAPI(taskId);
    return { taskId, cardId, category };
  }
);

export const allCategoryByCardThunk = createAsyncThunk(
  "tasks/fetchCategoryCount",
  async (cardId: string) => {
    const response = await AllCategoryByCard(cardId);
    return response;
  }
);

export const allCategorythunk = createAsyncThunk(
  "tasks/fetchTotalCategoryCount",
  async () => {
    const response = await AllCategory();
    console.log(`Fetched total category count from TaskAPI:`, response);
    return response;
  }
);
export const allTasksThunk = createAsyncThunk(
  "tasks/fetchTotalTasksCountAsync",
  async () => {
    const response = await AllTasks();
    return response;
  }
);

export const markTaskAsDoneThunk = createAsyncThunk(
  "tasks/markTaskAsDone",
  async (taskId: string, { getState }) => {
    const response = await updateTaskAPI({
      id: taskId,
      status: "done",
    } as Task);

    const state = getState() as { tasks: TaskState };
    const task = state.tasks.tasks.find((task) => task.id === taskId);

    if (task) {
      return { taskId, categories: task.categories || [] }; // Return all categories or an empty array if none.
    }
    return { taskId };
  }
);

export const tasksDueTodayThunk = createAsyncThunk(
  "tasks/fetchTasksForTodayStatus",
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await TasksDueToday();
      return tasks;
    } catch (err) {
      return rejectWithValue("failed fetching the Tasks due TODAY");
    }
  }
);
export const tasksDoneTodayThunk = createAsyncThunk(
  "tasks/fetchDoneTasksCount",
  async () => {
    const response = await TasksDoneToday();
    return response;
  }
);
