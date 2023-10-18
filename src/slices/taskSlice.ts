import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../components/Tasks/taskTypes";

import {
  fetchTasks,
  postTask as createTaskAPI,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
  fetchCategoryCount,
} from "../Api/TasksAPI";

export interface CategoryCounts {
  Urgent: number;
  Running: number;
  Ongoing: number;
}
interface DeleteTaskPayload {
  taskId: string;
  cardId: string;
  category?: keyof CategoryCounts;
}
type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: null | string;
  categoryCount?: CategoryCounts;
  taskCountsByCard: { [cardId: string]: number };
  categoryCountsByCard: { [cardId: string]: CategoryCounts };
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  taskCountsByCard: {},
  categoryCountsByCard: {},
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksByCardId: (state, action: PayloadAction<{ cardId: string }>) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksByCardIdSuccess: (
      state,
      action: PayloadAction<{ tasks: Task[]; cardId: string }>
    ) => {
      const { tasks, cardId } = action.payload;
      state.tasks = tasks;
      state.taskCountsByCard[cardId] = tasks.length;
      state.loading = false;
    },
    fetchTasksByCardIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTask: (
      state,
      action: PayloadAction<{
        content: string;
        date: string;
        cardId: string;
        description: string;
        categories: string[];
      }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      if (
        action.payload.cardId &&
        state.taskCountsByCard[action.payload.cardId]
      ) {
        state.taskCountsByCard[action.payload.cardId] += 1;
      } else if (action.payload.cardId) {
        state.taskCountsByCard[action.payload.cardId] = 1;
      }
      state.loading = false;
    },
    createTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTask: (state, action: PayloadAction<DeleteTaskPayload>) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action: PayloadAction<DeleteTaskPayload>) => {
      const { taskId: id, cardId, category } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      if (cardId && state.taskCountsByCard[cardId]) {
        state.taskCountsByCard[cardId] -= 1;
      }
      if (
        cardId &&
        category &&
        state.categoryCountsByCard[cardId] &&
        state.categoryCountsByCard[cardId][category]
      ) {
        state.categoryCountsByCard[cardId][category] = Math.max(
          0,
          state.categoryCountsByCard[cardId][category] - 1
        );
      }
      state.loading = false;
    },

    deleteTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.loading = false;
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoryCountSuccess: (
      state,
      action: PayloadAction<CategoryCounts>
    ) => {
      state.categoryCount = action.payload;
      state.loading = false;
    },

    fetchCategoryCountFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    incrementCategoryCount: (
      state,
      action: PayloadAction<{ category: keyof CategoryCounts; count: number }>
    ) => {
      if (state.categoryCount) {
        state.categoryCount[action.payload.category] += action.payload.count;
      }
    },
    decrementCategoryCount: (
      state,
      action: PayloadAction<{ category: keyof CategoryCounts; count: number }>
    ) => {
      if (state.categoryCount) {
        state.categoryCount[action.payload.category] -= action.payload.count;
      }
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks; // Access tasks from the payload
        state.taskCountsByCard[action.payload.cardId] =
          action.payload.tasks.length;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      })
      // Handle creating tasks
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);

        const cardId = action.payload.cardId;
        if (cardId) {
          if (state.taskCountsByCard[cardId]) {
            state.taskCountsByCard[cardId]++;
          } else {
            state.taskCountsByCard[cardId] = 1;
          }
        }
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to create task";
      })

      // Handle updating tasks
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to update task";
      })

      // Handle deleting tasks
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        const { taskId, cardId, category } = action.payload;

        state.tasks = state.tasks.filter((task) => task.id !== taskId);

        if (cardId && state.taskCountsByCard[cardId]) {
          state.taskCountsByCard[cardId]--;
        }

        if (
          cardId &&
          category &&
          state.categoryCountsByCard[cardId] &&
          state.categoryCountsByCard[cardId][category]
        ) {
          state.categoryCountsByCard[cardId][category] = Math.max(
            0,
            state.categoryCountsByCard[cardId][category] - 1
          );
        }
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to delete task";
      })
      .addCase(fetchCategoryCountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryCountAsync.fulfilled, (state, action) => {
        state.loading = false;

        const cardId = action.meta.arg;

        // Create a copy of the existing counts for the card or default to initial values
        const updatedCounts = {
          ...state.categoryCountsByCard[cardId],
          Urgent: 0,
          Running: 0,
          Ongoing: 0,
        };

        const counts = action.payload;
        for (let key in counts) {
          const formattedKey = (key.charAt(0) +
            key.slice(1).toLowerCase()) as keyof CategoryCounts;
          updatedCounts[formattedKey] = counts[key];
        }

        // Assign the modified copy back to the state
        state.categoryCountsByCard[cardId] = updatedCounts;
      })

      .addCase(fetchCategoryCountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch category count";
      });
  },
});
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
    console.log("Attempting to delete task with data:", taskData);

    await deleteTaskAPI(taskId);
    console.log("Task deleted successfully");

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

export const {
  fetchTasksByCardId,
  fetchTasksByCardIdSuccess,
  fetchTasksByCardIdFailure,
  createTask,
  createTaskSuccess,
  createTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  fetchCategoryCountSuccess,
  fetchCategoryCountFailure,
  incrementCategoryCount,
} = tasksSlice.actions;

export default tasksSlice.reducer;
