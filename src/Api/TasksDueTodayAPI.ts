// Tasks Due Today ----------
export const fetchTasksDueToday = async () => {
  try {
    const res = await fetch("http://localhost:3001/tasks-due-today");
    if (!res.ok) {
      throw new Error(`API response status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks due today:", error);
    throw error;
  }
};
