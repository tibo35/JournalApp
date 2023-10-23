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
  }) => {
    const { content, date, cardId, description, categories } = taskData;
    const response = await createTaskAPI(
      content,
      date,
      cardId,
      description,
      categories
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
