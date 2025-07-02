import { useState } from "react";
import { FaHandsHelping, FaUtensils, FaSmile } from "react-icons/fa";
import ReviewSection from "../About/ReviewSection/ReviewSection";

const tabs = [
  { label: "Our Story", key: "story", icon: <FaHandsHelping className="text-primary" /> },
  { label: "Our Mission", key: "mission", icon: <FaUtensils className="text-primary" /> },
  { label: "Our Impact", key: "impact", icon: <FaSmile className="text-primary" /> },
];

const content = {
  story: `
    Meal Bridge began as a small initiative to connect those with surplus food to communities in need.
    What started in local neighborhoods has now grown into a trusted platform, bridging the gap between
    food donors and those facing hunger — reducing food waste, one meal at a time.
  `,
  mission: `
    Our mission is simple yet powerful: to fight hunger while reducing food waste.
    By connecting individuals, restaurants, and organizations with surplus food to local charities
    and communities, we aim to make sharing easy, impactful, and sustainable.
  `,
  impact: `
    Thanks to our community, we've shared thousands of meals, supported local shelters, and
    prevented tons of food from ending up in landfills. Together, we’re proving that small acts
    of kindness can create meaningful change.
  `,
};

export default function Support() {
  const [activeTab, setActiveTab] = useState("story");

  return (
     <>
    <section className="w-[95vw] mx-auto px-4 py-16 text-base-content">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Why Meal Bridge
        </h2>
        <p className="max-w-2xl mx-auto text-base-content/70 text-lg">
          Learn about our journey, mission, and the impact we’re making together.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-base-content/20 mb-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 pb-2 text-sm md:text-base font-semibold transition-all duration-300 border-b-2 ${
                activeTab === tab.key
                  ? "text-primary border-primary"
                  : "border-transparent text-base-content/60 hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative bg-base-100 border border-base-300 rounded-xl shadow-md p-6 md:p-10 transition-all duration-500">
        <div className="space-y-5 text-base md:text-lg leading-relaxed">
          {content[activeTab]
            .trim()
            .split("\n")
            .map((para, idx) => (
              <p key={idx}>{para.trim()}</p>
            ))}
        </div>
      </div>
    </section>
   <ReviewSection></ReviewSection>
    </>
  );
}
