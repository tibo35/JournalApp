const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// Projects ----------
export const fetchProjects = () =>
  fetch(`${BASE_URL}/projects`).then((res) => res.json());

export const deleteProject = (id: string) =>
  fetch(`${BASE_URL}/projects/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

export const postProject = (title: string) =>
  fetch(`${BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
