import { useEffect, useState } from "react";
import { getPlans } from "../api/planAPI";
import PlanCard from "../components/PlanCard";

interface Plan {
  _id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
  features: string[];
}

const Plans = () => {

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchPlans = async () => {

      try {

        const res = await getPlans();

        // If API returns array
        setPlans(res.data);

        // If API returns { plans: [...] }
        // setPlans(res.data.plans);

      } catch (err) {

        console.error(err);
        setError("Failed to load membership plans. Please try again.");

      } finally {

        setLoading(false);

      }

    };

    fetchPlans();

  }, []);

  /* ---------- LOADING STATE ---------- */

  if (loading) {

    return (

      <div className="max-w-7xl mx-auto p-6">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold mb-3">
            Membership Plans
          </h1>

          <p className="text-gray-500">
            Choose the plan that fits your fitness journey
          </p>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {[...Array(3)].map((_, index) => (

            <div
              key={index}
              className="p-6 border rounded-xl shadow animate-pulse"
            >

              <div className="h-6 bg-gray-200 rounded mb-4"></div>

              <div className="h-4 bg-gray-200 rounded mb-2"></div>

              <div className="h-4 bg-gray-200 rounded mb-2"></div>

              <div className="h-4 bg-gray-200 rounded mb-4"></div>

              <div className="h-10 bg-gray-200 rounded"></div>

            </div>

          ))}

        </div>

      </div>

    );

  }

  /* ---------- ERROR STATE ---------- */

  if (error) {

    return (

      <div className="flex justify-center items-center h-[60vh]">

        <p className="text-red-500 text-lg">
          {error}
        </p>

      </div>

    );

  }

  /* ---------- MAIN UI ---------- */

  return (

    <div className="max-w-7xl mx-auto p-6">

      {/* HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold mb-3">
          Membership Plans
        </h1>

        <p className="text-gray-500">
          Choose the plan that fits your fitness journey
        </p>

      </div>

      {/* PLANS */}

      {plans.length === 0 ? (

        <div className="text-center text-gray-500">
          No plans available
        </div>

      ) : (

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

          {plans.map((plan) => (

            <PlanCard
              key={plan._id}
              plan={plan}
            />

          ))}

        </div>

      )}

    </div>

  );

};

export default Plans;