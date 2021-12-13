import { API_BASE_URL } from "../config";

const client = async (
  endpoint,
  { body = null, method = null, headers = {} }
) => {
  const config = {
    method: method ? method : body ? "POST" : "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(new URL(`${API_BASE_URL}/${endpoint}`).toString(), config)
    .then(async (resp) => {
      if (resp.status === 204) return { success: true };

      const data = await resp.json();

      if (resp.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export default client;
