import { useEffect, useState } from "react";
import type { Activity } from "../types/member";

const ActivityFeed = () => {

  const [activities, setActivities] = useState<Activity[]>([]);

  const loadActivities = () => {

    const stored = localStorage.getItem("gymActivities");

    if (stored) {

      const parsed = JSON.parse(stored);

      // show only latest 4
      setActivities(parsed.slice(0, 4));

    } else {
      setActivities([]);
    }

  };

  useEffect(() => {

    loadActivities();

    const handleStorageChange = () => {
      loadActivities();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };

  }, []);

  const getIcon = (message: string) => {

    const text = message.toLowerCase();

    if (text.includes("visited")) return "🧭";
    if (text.includes("membership") || text.includes("plan")) return "💳";
    if (text.includes("workout")) return "🏋";
    if (text.includes("profile")) return "👤";

    return "📌";

  };

  return (

    <div className="bg-white p-6 rounded-xl shadow h-80 flex flex-col">

      <h3 className="font-semibold mb-4">
        Recent Activity
      </h3>

      <div className="flex-1 overflow-y-auto">

        <ul className="space-y-3 text-gray-600">

          {activities.length === 0 && (
            <li>No recent activity</li>
          )}

          {activities.map((a, index) => (

            <li key={index} className="border-b pb-2">

              <p>
                {getIcon(a.message)} {a.message}
              </p>

              <p className="text-xs text-gray-400">
                {new Date(a.time).toLocaleString()}
              </p>

            </li>

          ))}

        </ul>

      </div>

    </div>

  );
};

export default ActivityFeed;