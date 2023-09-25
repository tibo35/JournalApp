const BASE_URL = process.env.REACT_APP_BASE_URL;

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
  description: string
) =>
  fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, date, cardId, description }),
  }).then((res) => res.json());
