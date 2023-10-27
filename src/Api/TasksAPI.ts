import { Task } from "../components/Tasks/taskTypes";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Tasks ----------
export const AllTasksByCard = async (cardId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${cardId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const DeleteTask = (id: string) =>
  fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

export const CreateTask = (
  content: string,
  date: string,
  cardId: string,
  description: string,
  categories: string[] = [],
  status: string
) =>
  fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      date,
      cardId,
      description,
      categories,
      status,
    }),
  }).then((res) => res.json());

export const UpdateTask = (updatedTask: Task) => {
  return fetch(`${BASE_URL}/tasks/${updatedTask.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  }).then((res) => res.json());
};
export const AllCategory = async (excludeDone = true) => {
  const response = await fetch(
    `${BASE_URL}/tasks/categoriesCount?excludeDone=${excludeDone}`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(`Fetched total category count from TaskAPI:`, data);
    return data;
  }
  throw new Error("Error fetching total category count");
};

export const AllCategoryByCard = async (cardId: string, excludeDone = true) => {
  const response = await fetch(
    `${BASE_URL}/tasks/categoriesCount/${cardId}?excludeDone=${excludeDone}`
  );
  if (response.ok) {
    const data = await response.json();
    console.log(`Fetched category count TaskAPI ${cardId}:`, data);
    return data;
  }
  throw new Error("Error fetching category count");
};

export const AllTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks/count`);
  if (response.ok) {
    const data = await response.json();

    return data;
  }
  throw new Error("Error fetching category count");
};

export const TasksDueToday = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/due-today`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export const TasksDoneToday = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/done`);
    const doneTasks = await res.json();
    return doneTasks.length;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
