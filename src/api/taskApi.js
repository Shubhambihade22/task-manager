import axios from "axios";

const API_URL = "http://localhost:8082/api/tasks";

export const getTasks = () => {
  return axios.get(API_URL);
};

export const getTaskById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createTask = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateTask = (id, formData) => {
  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const markDone = (id) => {
  return axios.patch(`${API_URL}/${id}/done`);
};

export const downloadFile = (id) => {
  return axios.get(`${API_URL}/${id}/download`, {
    responseType: "blob",
  });
};
