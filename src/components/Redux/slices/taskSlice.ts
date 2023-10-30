import { createSlice } from "@reduxjs/toolkit";
import { TaskState } from "../states/taskState";
import { CategoryCounts } from "../../Category/categoryCountsInterface";
import {
  allTasksByCardThunk,
  createTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
  allCategoryByCardThunk,
  allCategorythunk,
  allTasksThunk,
  markTaskAsDoneThunk,
  tasksDueTodayThunk,
  tasksDoneTodayThunk,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allTasksByCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allTasksByCardThunk.fulfilled, (state, action) => {
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
      .addCase(allTasksByCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      })

      // Handle creating tasks
      .addCase(createTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskThunk.fulfilled, (state, action) => {
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
      .addCase(createTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to create task";
      })

      // Handle updating tasks
      .addCase(updateTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to update task";
      })

      // Handle deleting tasks
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
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
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to delete task";
      })
      .addCase(allCategoryByCardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allCategoryByCardThunk.fulfilled, (state, action) => {
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

      .addCase(allCategoryByCardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch category count";
      })
      .addCase(allCategorythunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allCategorythunk.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCategoryCounts = action.payload;
        console.log(
          `Fetched total category count from TaskAPI:`,
          action.payload
        );
      })
      .addCase(allCategorythunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch total category count";
      })
      .addCase(allTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allTasksThunk.fulfilled, (state, action) => {
        state.totalTasksCount = action.payload.count;
      })
      .addCase(allTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "failed to fetched total tasks count";
      })
      .addCase(tasksDueTodayThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tasksDueTodayThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Here, you're just counting the tasks and not storing them
        state.tasksForTodayCount = action.payload.length;
      })
      .addCase(tasksDueTodayThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to get the Task due";
      })
      .addCase(tasksDoneTodayThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(tasksDoneTodayThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doneTasksCount = action.payload;
      })
      .addCase(tasksDoneTodayThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch count of done tasks";
      });
  },
});

export default tasksSlice.reducer;
