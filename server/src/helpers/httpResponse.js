export default function makeHttpResponse({ statusCode, data = null }) {
  return {
    headers: {
      "Content-Type": "application/json",
    },
    statusCode,
    data: JSON.stringify(data || {}),
  };
}
