import api from "./api";

export const SeriesService = {
  getAll: () => api.get("/series"),

  getById: (id) => api.get(`/series/${id}`),

  create: (data) => api.post("/series", data),

  update: (id, data) => api.put(`/series/${id}`, data),

  remove: (id) => api.del(`/series/${id}`),
};