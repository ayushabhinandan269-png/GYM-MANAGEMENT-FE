import type { Workout } from "../types/member";

interface WeeklySummaryProps {
  workouts: Workout[];
}

const WeeklySummary = ({ workouts }: WeeklySummaryProps) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h3 className="font-semibold mb-4">
        Weekly Summary
      </h3>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span className="text-gray-500">Workouts</span>
          <span className="font-semibold">{workouts.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Calories</span>
          <span className="font-semibold">850</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Hours</span>
          <span className="font-semibold">4.5</span>
        </div>

      </div>

    </div>

  );
};

export default WeeklySummary;