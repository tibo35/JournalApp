// Photo of the day
export const fetchPhoto = () =>
  fetch("http://localhost:3001/PhotoOfTheDay").then((res) => res.json());

export const deletePhoto = (id: string) =>
  fetch(`http://localhost:3001/PhotoOfTheDay/${id}`, { method: "DELETE" }).then(
    (res) => res.json()
  );

export const postPhoto = (title: string) =>
  fetch("http://localhost:3001/PhotoOfTheDay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());

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
  dueDate: string,
  cardId: string // Post tasks with cardId
) =>
  fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, dueDate, cardId }),
  }).then((res) => res.json());

// SignUp ----------
export const postSignUp = (
  name: string,
  email: string,
  username: string,
  password: string
) =>
  fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      username,
      password,
    }),
  }).then((res) => res.json());

// Projects ----------
export const fetchProjects = () =>
  fetch("http://localhost:3001/projects").then((res) => res.json());

export const deleteProject = (id: string) =>
  fetch(`http://localhost:3001/projects/${id}`, { method: "DELETE" }).then(
    (res) => res.json()
  );

export const postProject = (title: string) =>
  fetch("http://localhost:3001/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
