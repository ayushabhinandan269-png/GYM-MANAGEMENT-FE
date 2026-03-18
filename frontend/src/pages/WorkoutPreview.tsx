import { useState } from "react";

const workouts = [
  {
    id: 1,
    name: "Full Body Burn",
    level: "Beginner",
    duration: "30 mins",
    calories: "250 kcal",
    muscle: "Full Body",
    exercises: ["Jumping Jacks", "Push-ups", "Squats", "Plank"],
    image:
      "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg",
  },
  {
    id: 2,
    name: "Chest Builder",
    level: "Intermediate",
    duration: "40 mins",
    calories: "320 kcal",
    muscle: "Chest",
    exercises: ["Bench Press", "Push-ups", "Chest Fly", "Cable Crossover"],
    image:
      "https://images.pexels.com/photos/2261485/pexels-photo-2261485.jpeg",
  },
  {
    id: 3,
    name: "Leg Day Power",
    level: "Advanced",
    duration: "50 mins",
    calories: "400 kcal",
    muscle: "Legs",
    exercises: ["Squats", "Lunges", "Leg Press", "Calf Raises"],
    image:
      "https://images.pexels.com/photos/3838389/pexels-photo-3838389.jpeg",
  },
  {
    id: 4,
    name: "Core Crusher",
    level: "Beginner",
    duration: "25 mins",
    calories: "180 kcal",
    muscle: "Abs",
    exercises: ["Crunches", "Leg Raises", "Russian Twists", "Plank"],
    image:
      "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
  },
];

const WorkoutPreview = () => {
  const [filter, setFilter] = useState("All");

  const muscles = ["All", "Full Body", "Chest", "Legs", "Abs"];

  const filteredWorkouts =
    filter === "All"
      ? workouts
      : workouts.filter((w) => w.muscle === filter);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-8">

      {/* PAGE TITLE */}

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Workout Library</h1>
        <p className="text-gray-600">
          Explore workouts designed by professional trainers
        </p>
      </div>

      {/* FILTER */}

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {muscles.map((muscle) => (
          <button
            key={muscle}
            onClick={() => setFilter(muscle)}
            className={`px-4 py-2 rounded-full border ${
              filter === muscle
                ? "bg-yellow-500 text-black"
                : "bg-white text-gray-700"
            }`}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* WORKOUT GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {filteredWorkouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={workout.image}
              alt={workout.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-xl font-bold mb-2">{workout.name}</h3>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  workout.level === "Beginner"
                    ? "bg-green-100 text-green-700"
                    : workout.level === "Intermediate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {workout.level}
              </span>

              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>⏱ Duration: {workout.duration}</p>
                <p>🔥 Calories: {workout.calories}</p>
                <p>💪 Muscle: {workout.muscle}</p>
              </div>

              {/* EXERCISES */}

              <div className="mt-4">
                <p className="font-semibold text-sm mb-1">Exercises:</p>

                <ul className="text-sm text-gray-600 list-disc ml-5">
                  {workout.exercises.map((ex, index) => (
                    <li key={index}>{ex}</li>
                  ))}
                </ul>
              </div>

              {/* CTA */}

              <button className="mt-6 w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400 transition">
                Join Gym to Access
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default WorkoutPreview;