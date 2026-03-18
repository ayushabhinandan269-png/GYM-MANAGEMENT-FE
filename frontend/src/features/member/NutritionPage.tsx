import { useEffect, useState } from "react";
import {
  addMeal,
  getNutrition,
  getDietSuggestion,
  generateMealPlan,
  getWeeklyNutrition
} from "../../api/nutritionAPI";

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis
} from "recharts";

import { motion } from "framer-motion";


const COLORS = {
  protein: "#fb923c",
  carbs: "#facc15",
  fats: "#f87171"
};

const NutritionPage = () => {

  const [meal, setMeal] = useState("");
  const [data, setData] = useState<any>({ meals: [], totalCalories: 0 });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [goal, setGoal] = useState(2500);
  const [weekly, setWeekly] = useState<any[]>([]);
  const [insights, setInsights] = useState<any>(null);

  const [goalType, setGoalType] = useState("cut");
  const [weight, setWeight] = useState(70);

  const [aiAdvice, setAiAdvice] = useState("");
  const [mealPlan, setMealPlan] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [predictedCalories, setPredictedCalories] = useState<number | null>(null);

  /* ---------------- THEME ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ---------------- FETCH ---------------- */
  const fetchData = async () => {
    try {
      setPageLoading(true);

      const res = await getNutrition();
      setData(res.data || { meals: [], totalCalories: 0 });

      const weeklyRes = await getWeeklyNutrition();
      setWeekly(weeklyRes.data.weekly || []);
      setInsights(weeklyRes.data.insights || null);

    } catch {
      // Handle error silently or implement error display
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ---------------- ADD ---------------- */
  const handleAddMeal = async () => {
    if (!meal) return;
    setLoading(true);
    await addMeal(meal);
    setMeal("");
    await fetchData();
    setLoading(false);
  };

  /* ---------------- AI ---------------- */
  const handleAISuggest = async () => {
    const res = await getDietSuggestion({ goal: goalType, weight });
    setAiAdvice(res.data.suggestion);
  };

  const handleMealPlan = async () => {
    const res = await generateMealPlan(goalType);
    setMealPlan(res.data.plan);
  };

  /* ---------------- AI CALC ---------------- */
  useEffect(() => {
    const avg = insights?.averageCalories || 0;
    setPredictedCalories(goalType === "cut" ? avg - 300 : avg + 300);
  }, [insights, goalType]);

  /* ---------------- MACROS ---------------- */
  const totalProtein = data.meals.reduce((a:any,m:any)=>a+(m.protein||0),0);
  const totalCarbs = data.meals.reduce((a:any,m:any)=>a+(m.carbs||0),0);
  const totalFats = data.meals.reduce((a:any,m:any)=>a+(m.fats||0),0);

  const pieData = [
    { name: "Protein", value: totalProtein, color: COLORS.protein },
    { name: "Carbs", value: totalCarbs, color: COLORS.carbs },
    { name: "Fats", value: totalFats, color: COLORS.fats }
  ];

  const progress = Math.min((data.totalCalories / goal) * 100, 100);

  /* 🎨 THEMES */
  const pageBg = darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
    : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-900";

  const card = darkMode
    ? "bg-gray-800/70 backdrop-blur border border-gray-700"
    : "bg-white shadow";

  const input = darkMode
    ? "bg-gray-900 border-gray-700 text-white"
    : "bg-white border-gray-300";

  if (pageLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className={`${pageBg} min-h-screen p-6 md:p-10 transition-all`}>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🍎 Nutrition Dashboard</h1>

        <button
          onClick={()=>setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* GOAL */}
      <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl mb-6`}>
        <h2 className="mb-3 font-semibold">Daily Goal</h2>

        <input
          type="number"
          value={goal}
          onChange={(e)=>setGoal(Number(e.target.value))}
          className={`p-2 rounded-lg border ${input}`}
        />

        <p className="mt-3">{data.totalCalories} / {goal} kcal</p>

        <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded mt-3">
          <div
            className="h-3 rounded bg-linear-to-r from-green-400 to-green-600"
            style={{ width: `${progress}%` }}
          />
        </div>

        {predictedCalories && (
          <p className="mt-2 text-green-400 text-sm">
            🤖 Suggested: {predictedCalories} kcal
          </p>
        )}
      </motion.div>

      {/* ADD */}
      <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl mb-6`}>
        <div className="flex gap-3">
          <input
            value={meal}
            onChange={(e)=>setMeal(e.target.value)}
            className={`p-3 rounded-lg border w-full ${input}`}
            placeholder="e.g. rice + chicken"
          />
          <button
            onClick={handleAddMeal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            {loading ? "..." : "Add"}
          </button>
        </div>
      </motion.div>

      {/* MACROS */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl`}>
          <h2 className="mb-4 font-semibold">Macros</h2>

          {[{label:"Protein",val:totalProtein,color:"bg-orange-500"},
            {label:"Carbs",val:totalCarbs,color:"bg-yellow-500"},
            {label:"Fats",val:totalFats,color:"bg-red-500"}]
            .map((m,i)=>(
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm">
                  {m.label} <span>{m.val}g</span>
                </div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded mt-1">
                  <div className={`h-2 ${m.color} rounded`} style={{ width: `${Math.min(m.val,100)}%` }}/>
                </div>
              </div>
          ))}
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl`}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* WEEKLY */}
      <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl mb-6`}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weekly}>
            <XAxis dataKey="day"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="calories" stroke="#3b82f6" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI */}
      <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl mb-6`}>
        <div className="flex gap-3 mb-4">
          <select value={goalType} onChange={(e)=>setGoalType(e.target.value)} className={`p-2 border rounded ${input}`}>
            <option value="cut">Fat Loss</option>
            <option value="bulk">Muscle Gain</option>
          </select>

          <input type="number" value={weight} onChange={(e)=>setWeight(Number(e.target.value))} className={`p-2 border rounded ${input}`}/>
        </div>

        <div className="flex gap-3">
          <button onClick={handleAISuggest} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Advice</button>
          <button onClick={handleMealPlan} className="bg-green-600 text-white px-4 py-2 rounded-lg">Plan</button>
        </div>
         {aiAdvice && (
  <div
    className={`mt-4 p-4 rounded-xl border text-sm leading-relaxed
    ${darkMode
      ? "bg-gray-700 text-gray-100 border-gray-600"
      : "bg-gray-100 text-gray-800 border-gray-300"
    }`}
  >
    <strong className="block mb-2">💡 AI Advice</strong>
    {aiAdvice}
  </div>
)}

{mealPlan && (
  <div
    className={`mt-4 p-4 rounded-xl border text-sm leading-relaxed whitespace-pre-wrap
    ${darkMode
      ? "bg-gray-700 text-gray-100 border-gray-600"
      : "bg-gray-100 text-gray-800 border-gray-300"
    }`}
  >
    <strong className="block mb-2">🍽 Meal Plan</strong>
    {mealPlan}
  </div>
)}

      </motion.div>

      {/* MEALS */}
      <motion.div whileHover={{ scale: 1.02 }} className={`${card} p-6 rounded-2xl`}>
        {data.meals.map((m:any,i:number)=>(
          <div key={i} className="flex justify-between border-b border-gray-600 py-2">
            <span>{m.name}</span>
            <span>{m.calories} kcal</span>
          </div>
        ))}
      </motion.div>

    </div>
  );
};

export default NutritionPage;