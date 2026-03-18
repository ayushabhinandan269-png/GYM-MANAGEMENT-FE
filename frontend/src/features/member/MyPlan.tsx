import { useEffect, useState } from "react";
import { getMyMembership } from "../../api/membershipAPI";
import { useNavigate } from "react-router-dom";

interface Membership {
  plan: {
    name: string
    price: number
    duration: string
  }
  startDate: string
  endDate: string
  status: string
}

const MyPlan = () => {

  const navigate = useNavigate();

  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPlan = async () => {

      try {

        const res = await getMyMembership();
        setMembership(res);

      } catch {

        setMembership(null);

      } finally {

        setLoading(false);

      }

    };

    fetchPlan();

  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!membership) {

    return (

      <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">

        <div className="bg-white p-8 rounded-xl shadow w-full max-w-md text-center">

          <h2 className="text-xl font-semibold mb-3">
            No Membership Plan
          </h2>

          <p className="text-gray-500 mb-4">
            You don't have an active membership plan.
          </p>

          <button
            onClick={() => navigate("/plans")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Browse Plans
          </button>

        </div>

      </div>

    );

  }

  const { plan, startDate, endDate, status } = membership;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const daysRemaining = Math.ceil(
    (end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (

    <div className="p-10 bg-gray-100 min-h-screen flex justify-center items-start">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-8 text-center">
          My Membership Plan
        </h2>

        <div className="border rounded-xl p-8 text-center space-y-4">

          {/* PLAN NAME */}
          <h3 className="text-2xl font-bold text-gray-800">
            {plan.name}
          </h3>

          {/* BADGE */}
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            Active Membership
          </span>

          {/* DAYS REMAINING */}
          <p className="text-sm text-gray-500">
            {daysRemaining > 0
              ? `${daysRemaining} days remaining`
              : "Membership expired"}
          </p>

          {/* PLAN DETAILS */}
          <div className="pt-4 space-y-2 text-gray-600">

            <p>
              <span className="font-medium">Duration:</span> {plan.duration}
            </p>

            <p>
              <span className="font-medium">Price:</span> ₹{plan.price}
            </p>

            <p>
              <span className="font-medium">Start Date:</span>{" "}
              {start.toDateString()}
            </p>

            <p>
              <span className="font-medium">Expiry Date:</span>{" "}
              {end.toDateString()}
            </p>

          </div>

          {/* STATUS + ACTION */}
          <div className="flex justify-center gap-3 pt-4">

            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium capitalize">
              {status}
            </span>

            <button
              onClick={() => navigate("/dashboard/plans")}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Renew Plan
            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default MyPlan;