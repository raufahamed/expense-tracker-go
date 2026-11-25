import { BASE_URL } from "../constant";

export async function signUpUser(
  name: string,
  email: string,
  password: string,
) {
  const response = await fetch(BASE_URL + "/users/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "signUp Failed");
  }

  return response;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(BASE_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "login failed");
  }

  return response;
}
