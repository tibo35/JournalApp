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
