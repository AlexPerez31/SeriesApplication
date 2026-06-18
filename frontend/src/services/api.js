const BASE_URL = import.meta.env.VITE_API_URL;

async function request(url, options = {}) {
  const res = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Error en request");
  }

  return res.json();
}

const api = {
  get: (url) => request(url),
  post: (url, body) =>
    request(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: (url, body) =>
    request(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
    delete: (url) =>
    request(url, {
        method: "DELETE",
    }),
};

export default api;