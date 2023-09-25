const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

// SignUp ----------
export const postSignUp = (
  name: string,
  email: string,
  username: string,
  password: string
) =>
  fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      username,
      password,
    }),
  }).then((res) => res.json());
