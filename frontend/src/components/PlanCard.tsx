import { useState } from "react"
import { purchaseMembership } from "../api/membershipAPI"

interface Plan {
  _id: string
  name: string
  price: number
  duration: string
  features: string[]
}

interface PlanCardProps {
  plan: Plan
}

const PlanCard = ({ plan }: PlanCardProps) => {

  const [loading, setLoading] = useState(false)
  const [activated, setActivated] = useState(false)

  const imageMap: Record<string, string> = {
    Basic: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    Standard: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    Pro: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800",
    Premium: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
    Elite: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800",
    Ultimate: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800"
  }

  const image =
    imageMap[plan.name] ||
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800"

  const isPopular = plan.name === "Pro" || plan.name === "Premium"

  const handlePurchase = async () => {

    try {

      setLoading(true)

      await purchaseMembership(plan._id)

      setActivated(true)

    } catch (error) {

      console.error(error)
      alert("Failed to activate membership")

    } finally {

      setLoading(false)

    }

  }

  return (

    <div
      className={`relative bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border 
      ${isPopular ? "border-yellow-500 scale-105" : "border-gray-200"}`}
    >

      {isPopular && (
        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <img
        src={image}
        alt={plan.name}
        className="h-40 w-full object-cover"
        loading="lazy"
      />

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-2">
          {plan.name}
        </h2>

        <div className="mb-4">

          <span className="text-4xl font-bold">
            ₹{plan.price}
          </span>

          <span className="text-gray-500 text-sm ml-2">
            / {plan.duration}
          </span>

        </div>

        <ul className="text-sm text-gray-600 mb-6 space-y-2">

          {plan.features.map((feature, i) => (

            <li key={i} className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✔</span>
              {feature}
            </li>

          ))}

        </ul>

        {/* BUTTON */}

        {activated ? (

          <button
            disabled
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg"
          >
            Membership Activated
          </button>

        ) : (

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Processing..." : "Join Plan"}
          </button>

        )}

      </div>

    </div>

  )
}

export default PlanCard