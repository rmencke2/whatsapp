export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "€29",
      description: "Perfect to get started with an AI assistant on WhatsApp.",
      features: [
        "Basic Q&A",
        "Opening hours & services",
        "Single WhatsApp number",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "€49",
      description: "For growing businesses that want bookings & lead capture.",
      features: [
        "Everything in Starter",
        "Booking assistant",
        "Up to 50 FAQs",
        "Menu / price list sync",
        "Priority support"
      ]
    },
    {
      name: "Premium",
      price: "€99",
      description: "For serious businesses that want insights and personalization.",
      features: [
        "Everything in Pro",
        "Monthly analytics report",
        "Custom AI tone & behavior",
        "Multi-language replies",
        "Dedicated onboarding"
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-16">
      <h1 className="text-3xl font-bold text-center mb-10">Simple pricing</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="border rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
              <p className="text-2xl font-bold mb-2">{plan.price}<span className="text-base font-normal">/month</span></p>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <ul className="space-y-1 text-sm">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
            <button className="mt-6 w-full bg-black text-white py-2 rounded">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
