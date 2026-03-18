import API from "./axios";

export const getTrainers = () => {
  return API.get("/trainers");
};

export const createTrainer = (data: any) => {
  return API.post("/trainers", data);
};

export const updateTrainer = (id: string, data: any) => {
  return API.put(`/trainers/${id}`, data);
};

export const deleteTrainer = (id: string) => {
  return API.delete(`/trainers/${id}`);
};