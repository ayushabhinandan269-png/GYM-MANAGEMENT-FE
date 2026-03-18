import API from "./axios";


export const addMeal = (mealText: string) => {
  return API.post("/nutrition/add", { mealText });
};


export const getNutrition = () => {
  return API.get("/nutrition/me");
};

export const getDietSuggestion = (data: any) =>
  API.post("/nutrition/ai-suggest", data);

export const generateMealPlan = (goal: string) =>
  API.post("/nutrition/meal-plan", { goal });

export const getWeeklyNutrition = () =>
  API.get("/nutrition/weekly");