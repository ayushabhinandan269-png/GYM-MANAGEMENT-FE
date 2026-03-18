import API from "./axios";

/* GET ALL MEMBERS */
export const getMembers = () => {
  return API.get("/members");
};

/* CREATE MEMBER */
export const createMember = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return API.post("/auth/register", data);
};

/* DELETE MEMBER */
export const deleteMember = (id: string) => {
  return API.delete(`/members/${id}`);
};

/* ASSIGN MEMBERSHIP PLAN */
export const assignPlan = (data: {
  userId: string;
  planId: string;
}) => {
  return API.post("/members/assign-plan", data);
};

/* UPDATE MEMBERSHIP STATUS */
export const updateMembershipStatus = (data: {
  userId: string;
  status: "active" | "expired";
}) => {
  return API.post("/members/update-status", data);
};

/* ASSIGN TRAINER */
export const assignTrainer = (data: {
  userId: string;
  trainerId: string;
}) => {
  return API.post("/members/assign-trainer", data);
};

/* ASSIGN WORKOUT */
export const assignWorkout = (data: {
  userId: string;
  workoutId: string;
}) => {
  return API.post("/members/assign-workout", data);
};

/* GET MEMBER PROFILE */
export const getMemberProfile = () => {
  return API.get("/members/me");
};

/* UPDATE MEMBER PROFILE */
export const updateMemberProfile = (data: {
  phone?: string;
  age?: number;
  gender?: string;
}) => {
  return API.put("/members/me", data);
};

/* GET MEMBER PLAN */
export const getMemberPlan = () => {
  return API.get("/members/my-plan");
};

/* GET MEMBER WORKOUTS */
export const getMemberWorkouts = () => {
  return API.get("/workouts/member");
};