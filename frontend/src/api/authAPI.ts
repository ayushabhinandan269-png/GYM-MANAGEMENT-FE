import API from "./axios";

export const loginUser = (data: any) => {
  return API.post("/auth/login", data);
};

export const registerUser = (data: any) => {
  return API.post("/auth/register", data);
};

export const getProfile = () => {
  return API.get("/auth/profile");
};