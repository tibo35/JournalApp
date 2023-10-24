import {
  fetchTasks,
  postTask as createTaskAPI,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
  fetchCategoryCount,
  fetchTotalCategoryCount,
  fetchTotalTasksCount,
} from "../../../Api/TasksAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../Tasks/taskTypes";
import { CategoryCounts } from "../../Category/categoryCountsInterface";
import { TaskState } from "../../Tasks/taskState";
interface DeleteTaskPayload {
  taskId: string;
  cardId: string;
  category?: keyof CategoryCounts;
}

export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasksByCardId",
  async (cardId: string) => {
    const response = await fetchTasks(cardId);
    return { tasks: response, cardId };
  }
);
export const createTaskAsync = createAsyncThunk(
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
export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    const response = await updateTaskAPI(updatedTask);
    return response;
  }
);

// Async thunk for deleting a task
export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (taskData: DeleteTaskPayload) => {
    const { taskId, cardId, category } = taskData;
    await deleteTaskAPI(taskId);
    return { taskId, cardId, category };
  }
);

export const fetchCategoryCountAsync = createAsyncThunk(
  "tasks/fetchCategoryCount",
  async (cardId: string) => {
    const response = await fetchCategoryCount(cardId);
    return response;
  }
);

export const fetchTotalCategoryCountAsync = createAsyncThunk(
  "tasks/fetchTotalCategoryCount",
  async () => {
    const response = await fetchTotalCategoryCount();
    console.log(`Fetched total category count from TaskAPI:`, response);
    return response;
  }
);
export const fetchAllTasksCount = createAsyncThunk(
  "tasks/fetchTotalTasksCountAsync",
  async () => {
    const response = await fetchTotalTasksCount();
    return response;
  }
);
type TaskUpdate = {
  id: string;
  status?: string;
  content?: string;
  date?: Date;
  description?: string;
  categories?: string[];
  cardId?: string;
};
export const markTaskAsDoneAsync = createAsyncThunk(
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
