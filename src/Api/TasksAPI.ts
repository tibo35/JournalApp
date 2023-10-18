import { Task } from "../components/Tasks/taskTypes";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Tasks ----------
export const fetchTasks = async (cardId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/tasks/${cardId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const deleteTask = (id: string) =>
  fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

export const postTask = (
  content: string,
  date: string,
  cardId: string,
  description: string,
  categories: string[] = []
) =>
  fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, date, cardId, description, categories }),
  }).then((res) => res.json());

export const updateTask = (updatedTask: Task) => {
  return fetch(`${BASE_URL}/tasks/${updatedTask.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  }).then((res) => res.json());
};

export const fetchCategoryCount = async (cardId: string) => {
  const response = await fetch(`${BASE_URL}/tasks/categoriesCount/${cardId}`);
  if (response.ok) {
    const data = await response.json();
    console.log(`Fetched category count TaskAPI ${cardId}:`, data);

    return data;
  }
  throw new Error("Error fetching category count");
};
