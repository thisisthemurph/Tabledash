const API_URL = "http://localhost:3001/api";

const client = async (endpoint, { body, ...customConfig }) => {
  const config = {
    method: body ? "POST" : "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(new URL(`${API_URL}/${endpoint}`).toString(), config)
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
