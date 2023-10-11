import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "../slices/taskSlice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
