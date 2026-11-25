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

export async function getUser() {
  try {
    const response = await fetch(BASE_URL + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "canot able to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error, "error while fetching the user data");
    throw error;
  }
}

export async function logoutUser() {
  const resposne = await fetch(BASE_URL + "/users/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!resposne.ok) {
    const message = await resposne.text();
    throw new Error(message || "logout failed");
  }
}
