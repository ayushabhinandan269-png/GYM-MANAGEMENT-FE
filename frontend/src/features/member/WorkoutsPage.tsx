import { useEffect, useState } from "react";
import { getMemberWorkouts } from "../../api/memberAPI";
import { markWorkoutComplete } from "../../api/workoutAPI";

interface Workout {
  _id: string;
  assignedId: string;
  title: string;
  description: string;
  exercises?: string[];
  level?: string;
  duration?: number;
  trainerNotes?: string;
  calories?: number;
  completed?: boolean;
}

const WorkoutsPage = () => {

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayIndex = new Date().getDay();
  const todayWorkout = workouts[todayIndex];

  const weekProgress = calendarDays.map((_, i) => {
    return workouts[i]?.completed || false;
  });

  /* FETCH WORKOUTS */

  const fetchWorkouts = async () => {
    try {
      const res = await getMemberWorkouts();

      const stored = JSON.parse(
        localStorage.getItem("completedWorkouts") || "[]"
      );

      const updated = (res.data || []).map((w: any) => ({
        ...w,
        completed: w.completed || stored.includes(w.assignedId)
      }));

      setWorkouts(updated);

    } catch (err) {
      console.log("Failed to fetch workouts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  /* TIMER */

  useEffect(() => {
    let interval: any;

    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  /* MARK COMPLETE */

  const markCompleted = async (assignedId: string) => {
    try {
      console.log("Clicked:", assignedId);

      /* ✅ INSTANT UI UPDATE */
      setWorkouts((prev) =>
        prev.map((w) =>
          w.assignedId === assignedId
            ? { ...w, completed: true }
            : w
        )
      );

      /* ✅ SAVE TO LOCAL STORAGE */
      const stored = JSON.parse(
        localStorage.getItem("completedWorkouts") || "[]"
      );

      if (!stored.includes(assignedId)) {
        localStorage.setItem(
          "completedWorkouts",
          JSON.stringify([...stored, assignedId])
        );
      }

      /* ✅ BACKEND CALL */
      await markWorkoutComplete({ assignedId });

    } catch (err) {
      console.log("Error updating workout", err);
    }
  };

  if (loading) {
    return <div className="p-8">Loading workouts...</div>;
  }

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-8">
        My Workouts
      </h1>

      {/* TODAY WORKOUT */}

      {todayWorkout && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Today's Workout ({calendarDays[todayIndex]})
          </h2>

          <p className="text-gray-600 mb-3">
            {todayWorkout.title}
          </p>

          <div className="flex flex-wrap gap-2">
            {todayWorkout.exercises?.map((ex, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded text-sm"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SCHEDULE */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="font-semibold mb-4">
          Workout Schedule
        </h3>

        <div className="grid grid-cols-7 gap-3">
          {calendarDays.map((day, i) => {

            const workout = workouts[i];

            return (
              <div
                key={i}
                className={`p-3 rounded-lg text-center text-sm font-semibold ${
                  i === todayIndex
                    ? "bg-blue-600 text-white scale-105"
                    : workout
                    ? "bg-blue-200"
                    : "bg-gray-200"
                }`}
              >
                <div>{day}</div>

                {workout && (
                  <div className="text-xs mt-1">
                    {workout.title}
                  </div>
                )}

              </div>
            );

          })}
        </div>
      </div>

      {/* TIMER */}

      <div className="bg-white p-6 rounded-xl shadow mb-8 flex justify-between items-center">

        <div>
          <h3 className="font-semibold">
            Workout Timer
          </h3>
          <p className="text-gray-500 text-sm">
            Track your workout duration
          </p>
        </div>

        <div className="flex items-center gap-4">

          <span className="text-2xl font-bold">
            {formatTime()}
          </span>

          <button
            onClick={() => setTimerActive(!timerActive)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {timerActive ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setTimerActive(false);
              setSeconds(0);
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>

        </div>

      </div>

      {/* WEEKLY PROGRESS */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h3 className="font-semibold mb-4">
          Weekly Progress
        </h3>

        <div className="flex gap-4">
          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold ${
                weekProgress[i]
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

      </div>

      {/* WORKOUT CARDS */}

      {workouts.length === 0 ? (

        <div className="bg-white p-8 rounded-xl shadow text-center">

          <h2 className="text-xl font-semibold mb-2">
            No workouts assigned yet
          </h2>

          <p className="text-gray-500">
            Your trainer will assign workouts soon.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {workouts.map((workout) => (

            <div
              key={workout.assignedId}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              <div className="flex justify-between mb-2">

                <h2 className="text-xl font-semibold">
                  {workout.title}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    workout.completed
                      ? "bg-green-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {workout.completed ? "Completed" : "Pending"}
                </span>

              </div>

              <p className="text-gray-500 mb-4">
                {workout.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {workout.exercises?.map((ex, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-3 py-1 rounded text-sm"
                  >
                    {ex}
                  </span>
                ))}
              </div>

              {workout.duration && (
                <p className="text-sm text-gray-600 mb-4">
                  ⏱ Duration: {workout.duration} mins
                </p>
              )}

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className={`h-2 rounded-full ${
                    workout.completed
                      ? "bg-green-500 w-full"
                      : "bg-yellow-400 w-1/2"
                  }`}
                />
              </div>

              {!workout.completed ? (

                <button
                  onClick={() => markCompleted(workout.assignedId)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  Mark Completed
                </button>

              ) : (

                <div className="text-center text-green-600 font-semibold">
                  🏆 Completed ✔
                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default WorkoutsPage;