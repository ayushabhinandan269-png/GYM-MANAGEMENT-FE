
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getMemberProfile, getMemberWorkouts } from "../../api/memberAPI";
import { getMyMembership } from "../../api/membershipAPI";

import type { Member, Workout } from "../../types/member";

import WorkoutProgress from "../../components/WorkoutProgress";
import ActivityFeed from "../../components/ActivityFeed";
import WorkoutChart from "../../components/WorkoutChart";
import WeeklySummary from "../../components/WeeklySummary";

import { CreditCard, Flame, Dumbbell, User } from "lucide-react";

const MemberDashboard = () => {

  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [membership, setMembership] = useState<any>(null);

  const loadDashboard = useCallback(async () => {

    const profile = await getMemberProfile();
    const workoutData = await getMemberWorkouts();

    setMember(profile.data);
    setWorkouts(workoutData.data || []);

    try {
      const membershipData = await getMyMembership();
      setMembership(membershipData);
    } catch {
      setMembership(null);
    }

  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (!member) return <div className="p-6">Loading...</div>;

  return (

    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Welcome, {member.name}
      </h1>


      {/* TOP CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">

        <div
          onClick={() => navigate("/dashboard/plans")}
          className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={18} />
            <p className="text-gray-500">Plan</p>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold">
            {membership?.plan?.name || "None"}
          </h2>
        </div>


        <div className="bg-white p-5 sm:p-6 rounded-xl shadow">

          <div className="flex items-center gap-2 mb-2">
            <Flame size={18} />
            <p className="text-gray-500">Status</p>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold capitalize">
            {membership ? "Active" : "Inactive"}
          </h2>
        </div>


        <div
          onClick={() => navigate("/dashboard/workouts")}
          className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell size={18} />
            <p className="text-gray-500">Workouts</p>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold">
            {workouts.length}
          </h2>
        </div>


        <div
          onClick={() => navigate("/dashboard/profile")}
          className="bg-white p-5 sm:p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <div className="flex items-center gap-2 mb-2">
            <User size={18} />
            <p className="text-gray-500">Trainer</p>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold">
            {member.trainerAssigned?.name || "Not Assigned"}
          </h2>
        </div>

      </div>


      {/* PROGRESS + SUMMARY + ACTIVITY */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        <div className="space-y-6">

          <WorkoutProgress progress={60} />

          {/* WEEKLY SUMMARY COMPONENT */}
          <WeeklySummary workouts={workouts} />

          {/* WORKOUT STREAK */}

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="font-semibold mb-2">
              🔥 Workout Streak
            </h3>

            <p className="text-gray-500">
              5 days in a row
            </p>

          </div>

        </div>


        {/* ACTIVITY FEED */}

        <ActivityFeed />

      </div>


      {/* WEEKLY CHART */}

      <div className="mb-10">
        <WorkoutChart />
      </div>


      {/* QUICK ACTIONS */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-3 sm:gap-4">

          <button
            onClick={() => navigate("/dashboard/plans")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {membership ? "Renew Plan" : "Buy Plan"}
          </button>

          <button
            onClick={() => navigate("/dashboard/workouts")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            View Workouts
          </button>

          <button
            onClick={() => navigate("/dashboard/profile")}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>

        </div>

      </div>


      {/* TODAY WORKOUT + TRAINER */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="font-semibold mb-3">
            Today's Workout
          </h3>

          {workouts.length === 0 ? (

            <p className="text-gray-500">
              No workout scheduled today
            </p>

          ) : (

            <>
              <p className="font-medium">
                {workouts[0].name}
              </p>

              <p className="text-gray-500">
                {workouts[0].description}
              </p>
            </>

          )}

        </div>


        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="font-semibold mb-3">
            Your Trainer
          </h3>

          <p>
            {member.trainerAssigned?.name || "Not Assigned"}
          </p>

          {member.trainerAssigned && (

            <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded">
              Message Trainer
            </button>

          )}

        </div>

      </div>


      {/* MEMBERSHIP EXPIRY */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h3 className="font-semibold mb-2">
          Membership Expiry
        </h3>

        <p className="text-gray-600">

          {membership
            ? `Plan expires on: ${new Date(membership.endDate).toDateString()}`
            : "No active membership"}

        </p>

        <button
          onClick={() => navigate("/dashboard/plans")}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {membership ? "Renew Plan" : "Buy Plan"}
        </button>

      </div>


      {/* ASSIGNED WORKOUTS */}

      <div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          Assigned Workouts
        </h2>

        {workouts.length === 0 ? (

          <div className="bg-white p-6 rounded-xl shadow">

            <p className="text-gray-500">
              No workouts assigned yet
            </p>

            <button
              onClick={() => navigate("/dashboard/workouts")}
              className="text-blue-600 mt-2"
            >
              Browse workouts
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {workouts.map((w) => (

              <div
                key={w._id}
                className="bg-white p-5 rounded-xl shadow"
              >

                <h4 className="font-semibold">
                  {w.name}
                </h4>

                <p className="text-gray-600">
                  {w.description}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* FITNESS STATS */}

      <div className="mt-10 bg-white p-6 rounded-xl shadow">

        <h3 className="font-semibold mb-4">
          Fitness Stats
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

          <div>
            <p className="text-gray-500">Workouts Completed</p>
            <h3 className="text-xl font-semibold">12</h3>
          </div>

          <div>
            <p className="text-gray-500">Calories Burned</p>
            <h3 className="text-xl font-semibold">3000</h3>
          </div>

          <div>
            <p className="text-gray-500">Hours Trained</p>
            <h3 className="text-xl font-semibold">20</h3>
          </div>

        </div>

      </div>

    </div>

  );
};

export default MemberDashboard;
