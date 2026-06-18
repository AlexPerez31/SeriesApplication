import api from "./api";

export const DirectorsService = {
  getAll: () => api.get("/directors"),

  getById: (id) => api.get(`/directors/${id}`),

  create: (data) => api.post("/directors", data),

  update: (id, data) => api.put(`/directors/${id}`, data),

  remove: (id) => api.del(`/directors/${id}`),

  getSeries: (id) => api.get(`/directors/${id}/series`),
};