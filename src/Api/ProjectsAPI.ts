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
