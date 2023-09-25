const BASE_URL = process.env.REACT_APP_BASE_URL;

// Photo of the day
export const fetchPhoto = () =>
  fetch(`${BASE_URL}/PhotoOfTheDay`).then((res) => res.json());

export const deletePhoto = (id: string) =>
  fetch(`${BASE_URL}/PhotoOfTheDay/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );

export const postPhoto = (title: string) =>
  fetch(`${BASE_URL}/PhotoOfTheDay`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((res) => res.json());
