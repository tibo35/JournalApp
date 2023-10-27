import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "../states/taskState";
import { CategoryCounts } from "../../Category/categoryCountsInterface";
import {
  fetchTasksAsync,
  createTaskAsync,
  updateTaskAsync,
  deleteTaskAsync,
  fetchCategoryCountAsync,
  fetchTotalCategoryCountAsync,
  fetchAllTasksCount,
  markTaskAsDoneAsync,
  fetchTasksForTodayAsync,
  fetchDoneTasksCountAsync,
} from "../thunks/tasksThunk";
import { Task } from "../../Tasks/taskTypes"; // Make sure this path is correct

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
  taskCountsByCard: {},
  categoryCountsByCard: {},
  totalCategoryCounts: {},
  totalTasksCount: 0,
  taskStatusCountsByCard: {},
  tasksForTodayCount: 0,
  doneTasksCount: 0,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    markTaskAsDone: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = "done";
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
        state.tasks = action.payload.tasks;

        // Specify the type for task
        const pendingCount = action.payload.tasks.filter(
          (task: Task) => task.status === "pending"
        ).length;
        const doneCount = action.payload.tasks.filter(
          (task: Task) => task.status === "done"
        ).length;

        state.taskStatusCountsByCard[action.payload.cardId] = {
          pending: pendingCount,
          done: doneCount,
        };
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
      })
      .addCase(fetchTotalCategoryCountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalCategoryCountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCategoryCounts = action.payload;
        console.log(
          `Fetched total category count from TaskAPI:`,
          action.payload
        );
      })
      .addCase(fetchTotalCategoryCountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch total category count";
      })
      .addCase(fetchAllTasksCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasksCount.fulfilled, (state, action) => {
        state.totalTasksCount = action.payload.count;
      })
      .addCase(fetchAllTasksCount.rejected, (state, action) => {
        state.loading = false;
        state.error = "failed to fetched total tasks count";
      })
      .addCase(markTaskAsDoneAsync.pending, (state, action) => {})

      .addCase(markTaskAsDoneAsync.fulfilled, (state, action) => {
        const { taskId, categories } = action.payload;

        const task = state.tasks.find((task) => task.id === taskId);

        if (task) {
          const cardId = task.cardId;
          task.status = "done";

          // Update taskStatusCountsByCard
          if (!state.taskStatusCountsByCard[cardId]) {
            state.taskStatusCountsByCard[cardId] = { pending: 0, done: 0 };
          }
          state.taskStatusCountsByCard[cardId].done += 1; // Increment done count
          state.taskStatusCountsByCard[cardId].pending = Math.max(
            0,
            state.taskStatusCountsByCard[cardId].pending - 1
          ); // Decrement pending count

          // Only loop through categories if they're defined
          if (categories) {
            categories.forEach((category) => {
              if (
                state.categoryCountsByCard[cardId] &&
                state.categoryCountsByCard[cardId][category]
              ) {
                state.categoryCountsByCard[cardId][category] = Math.max(
                  0,
                  state.categoryCountsByCard[cardId][category] - 1
                );
              }
              fetchCategoryCountAsync(cardId);
              fetchTasksAsync(cardId);
            });
          }
        }
      })
      .addCase(markTaskAsDoneAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to mark task as done";
      })
      .addCase(fetchTasksForTodayAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksForTodayAsync.fulfilled, (state, action) => {
        state.loading = false;

        // Here, you're just counting the tasks and not storing them
        state.tasksForTodayCount = action.payload.length;
      })
      .addCase(fetchTasksForTodayAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to get the Task due";
      })
      .addCase(fetchDoneTasksCountAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoneTasksCountAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.doneTasksCount = action.payload;
      })
      .addCase(fetchDoneTasksCountAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch count of done tasks";
      });
  },
});

export default tasksSlice.reducer;
