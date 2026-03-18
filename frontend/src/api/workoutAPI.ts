import API from "./axios";

/* GET ALL WORKOUTS */
export const getWorkouts = () => {
  return API.get("/workouts");
};

/* CREATE WORKOUT (ADMIN) */
export const createWorkout = (data: any) => {
  return API.post("/workouts", data);
};

/* UPDATE WORKOUT (ADMIN) */
export const updateWorkout = (id: string, data: any) => {
  return API.put(`/workouts/${id}`, data);
};

/* DELETE WORKOUT (ADMIN) */
export const deleteWorkout = (id: string) => {
  return API.delete(`/workouts/${id}`);
};

/* ASSIGN WORKOUT TO MEMBER (ADMIN / TRAINER) */
export const assignWorkout = (data: {
  memberId: string;
  workoutId: string;
}) => {
  return API.post("/workouts/assign", data);
};

/* MARK WORKOUT COMPLETE (MEMBER) */
export const markWorkoutComplete = (data: { assignedId: string }) => {
  return API.put("/workouts/complete", data);
};