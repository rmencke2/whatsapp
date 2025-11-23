"use client";

import { useState } from "react";

type FAQItem = { question: string; answer: string };
type ServiceItem = { name: string; price?: string; description?: string };
type HourItem = { dayOfWeek: number; openTime: string; closeTime: string; closed?: boolean };

const days = [
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
  { label: "Sunday", value: 7 },
];

export default function OnboardingPage() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("restaurant");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [plan, setPlan] = useState<"starter" | "pro" | "premium">("starter");
  const [language, setLanguage] = useState("en");
  const [city, setCity] = useState("");
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [hours, setHours] = useState<HourItem[]>(
    days.map((d) => ({
      dayOfWeek: d.value,
      openTime: "09:00",
      closeTime: "18:00",
      closed: d.value === 7,
    }))
  );
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [voiceStyle, setVoiceStyle] = useState("friendly");
  const [bookingLink, setBookingLink] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          industry,
          phoneNumber,
          whatsappNumber,
          plan,
          language,
          city,
          faqItems,
          serviceItems: services,
          hourItems: hours,
          specialInstructions,
          voiceStyle,
          bookingLink,
          menuUrl,
        }),
      });

      if (!res.ok) {
        console.error(await res.json());
      } else {
        // redirect to dashboard, etc
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <h1 className="text-2xl font-bold">Onboard your WhatsApp AI assistant</h1>

      {/* Basic business info */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Business details</h2>
        <input
          className="border rounded p-2 w-full"
          placeholder="Business name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <input
          className="border rounded p-2 w-full"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          className="border rounded p-2 w-full"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        >
          <option value="restaurant">Restaurant</option>
          <option value="salon">Salon</option>
          <option value="gym">Gym / Studio</option>
          <option value="realestate">Real Estate</option>
          <option value="hotel">Hotel / B&B</option>
          <option value="other">Other</option>
        </select>

        <input
          className="border rounded p-2 w-full"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          className="border rounded p-2 w-full"
          placeholder="WhatsApp business number"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
        />

        <div className="flex gap-4">
          <select
            className="border rounded p-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="it">Italiano</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="da">Dansk</option>
            <option value="sv">Svenska</option>
            <option value="nl">Nederlands</option>
          </select>

          <select
            className="border rounded p-2"
            value={plan}
            onChange={(e) => setPlan(e.target.value as any)}
          >
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </section>

      {/* Hours */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Opening hours</h2>
        <div className="space-y-2">
          {days.map((d, idx) => (
            <div key={d.value} className="flex items-center gap-2">
              <span className="w-24">{d.label}</span>
              <input
                type="time"
                className="border rounded p-1"
                value={hours[idx].openTime}
                onChange={(e) => {
                  const copy = [...hours];
                  copy[idx].openTime = e.target.value;
                  setHours(copy);
                }}
                disabled={hours[idx].closed}
              />
              <span>-</span>
              <input
                type="time"
                className="border rounded p-1"
                value={hours[idx].closeTime}
                onChange={(e) => {
                  const copy = [...hours];
                  copy[idx].closeTime = e.target.value;
                  setHours(copy);
                }}
                disabled={hours[idx].closed}
              />
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={hours[idx].closed}
                  onChange={(e) => {
                    const copy = [...hours];
                    copy[idx].closed = e.target.checked;
                    setHours(copy);
                  }}
                />
                Closed
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Services + FAQ can be simple repeatable lists for now */}
      {/* ...you can flesh this out further later */}

      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Special instructions</h2>
        <textarea
          className="border rounded p-2 w-full min-h-[80px]"
          placeholder="Anything the assistant should always know or avoid..."
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
        />
      </section>

      <button
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Finish onboarding"}
      </button>
    </div>
  );
}
