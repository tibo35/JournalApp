const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);

// Topics -----------
export const fetchTopics = () =>
  fetch(`${BASE_URL}/topics`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching topics:", error);
    });

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
