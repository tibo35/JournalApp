// Tasks ----------
export const fetchTasks = async (cardId: string) => {
  try {
    const res = await fetch(`http://localhost:3001/tasks/${cardId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const deleteTask = (id: string) =>
  fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

export const postTask = (
  content: string,
  date: string,
  cardId: string,
  description: string
) =>
  fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, date, cardId, description }),
  }).then((res) => res.json());
