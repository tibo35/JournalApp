// Topics ----------
export const fetchTopics = () =>
  fetch("http://localhost:3001/topics").then((res) => res.json());

export const deleteTopic = (id: string) =>
  fetch(`http://localhost:3001/topics/${id}`, { method: "DELETE" }).then(
    (res) => res.json()
  );

export const postTopic = (title: string) =>
  fetch("http://localhost:3001/topics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
