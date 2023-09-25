const BASE_URL = process.env.REACT_APP_BASE_URL;

// Topics ----------
export const fetchTopics = () =>
  fetch(`${BASE_URL}/topics`).then((res) => res.json());

export const deleteTopic = (id: string) =>
  fetch(`${BASE_URL}/topics/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

export const postTopic = (title: string) =>
  fetch(`${BASE_URL}/topics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
