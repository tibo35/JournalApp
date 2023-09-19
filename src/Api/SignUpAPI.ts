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
