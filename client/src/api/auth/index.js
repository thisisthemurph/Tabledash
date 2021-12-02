const API_URL = "http://localhost:3001/api";

const makeRequest = async (endpoint, { ...body }) => {
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await fetch(new URL(`${API_URL}/${endpoint}`).toString(), config);
};

export const login = async ({ username, password }) => {
  const response = await makeRequest("auth/login", { username, password });

  if (response && response.ok) {
    const authToken = response.headers.get("auth-token");
    localStorage.setItem("token", authToken);
  } else {
    logout();
  }

  return await response.json();
};

export const logout = () => {
  localStorage.removeItem("token");
};
