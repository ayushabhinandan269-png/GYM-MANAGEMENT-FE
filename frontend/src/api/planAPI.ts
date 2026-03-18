import API from "./axios";

/* GET ALL PLANS */

export const getPlans = () => {
  return API.get("/plans");
};


/* CREATE PLAN (ADMIN) */

export const createPlan = (data: any) => {
  return API.post("/plans", data);
};


/* UPDATE PLAN (ADMIN) */

export const updatePlan = (id: string, data: any) => {
  return API.put(`/plans/${id}`, data);
};


/* DELETE PLAN (ADMIN) */

export const deletePlan = (id: string) => {
  return API.delete(`/plans/${id}`);
};

/* ACTIVATE / TOGGLE PLAN (ADMIN) */
export const togglePlan = (id: string) => {
  return API.patch(`/plans/toggle/${id}`);
};

/* MEMBER BUY PLAN */

export const buyPlan = (planId: string) => {
  return API.post("/plans/buy", { planId });
};


/* MEMBER GET CURRENT PLAN */

export const getMyPlan = () => {
  return API.get("/plans/my-plan");
};