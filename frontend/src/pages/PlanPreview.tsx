import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic Plan",
    price: "₹999",
    duration: "Monthly",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    features: [
      "Gym Access",
      "Locker Facility",
      "Basic Workout Plan"
    ]
  },
  {
    name: "Standard Plan",
    price: "₹1499",
    duration: "Monthly",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    features: [
      "All Basic Features",
      "Diet Plan",
      "Workout Guidance"
    ]
  },
  {
    name: "Premium Plan",
    price: "₹2000",
    duration: "Monthly",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
    features: [
      "Personal Trainer",
      "Advanced Diet Plan",
      "Workout Tracking"
    ]
  }
];

const PlanPreview = () => {

  const navigate = useNavigate();

  return (

    <div className="bg-gray-100 min-h-screen py-20">

      <h1 className="text-4xl font-bold text-center mb-12">
        Membership Plans
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {plans.map((plan, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={plan.image}
              alt={plan.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold mb-2">
                {plan.name}
              </h2>

              <div className="mb-4">

                <span className="text-3xl font-bold">
                  {plan.price}
                </span>

                <span className="text-gray-500 ml-2">
                  / {plan.duration}
                </span>

              </div>

              <ul className="space-y-2 text-gray-600 mb-6">

                {plan.features.map((feature, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}

              </ul>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                Login to Buy
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* CTA */}

      <div className="text-center mt-16">

        <h3 className="text-xl font-semibold mb-4">
          Join today and unlock full gym access
        </h3>

        <button
          onClick={() => navigate("/register")}
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
        >
          Register Now
        </button>

      </div>

    </div>

  );

};

export default PlanPreview;