import { useState } from "react";

const tabs = [
  { label: "Team & Others", key: "team" },
];

const content = {
  team: `
    We're a team of food warriors, tech builders, designers, and community champions.
    What unites us is our mission to reduce food waste and share surplus meals.
    Together with volunteers and partner organizations, we work to make Meal Bridge a source of hope and impact.
  `,
};

const teamMembers = [
  {
    name: "Tajuddin Green",
    role: "Founder & Chief Organizer",
    email: "tajuddin80.cse.dev@gmail.com",
    phone: "+880 1303-187780",
  },
  {
    name: "Taj Uddin",
    role: "Community Manager",
    email: "cmtajuddinchowdhury@gmail.com",
    phone: "+880 0184-5072525",
  },
  {
    name: "Rafiq Bin Basil",
    role: "Operations Lead",
    email: "rafiq.basil@mealbridge.io",
    phone: "+880 1985-334455",
  },
  {
    name: "Nadia Leaf",
    role: "UX Designer",
    email: "nadia.leaf@mealbridge.io",
    phone: "+880 1620-778899",
  },
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <section className="w-[95vw] mx-auto px-4 py-12 text-base-content">
      <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
        📞 Contact Our Team
      </h2>
      <p className="text-base-content/70 mb-8 text-lg max-w-2xl">
        Whether you want to share ideas, volunteer, or partner with us — connect with our core team anytime.
      </p>

      {/* Tabs */}
      <div className="border-b border-base-content/20 mb-4">
        <div className="flex flex-wrap gap-4 md:gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`pb-2 text-sm md:text-base font-medium transition-all duration-300 border-b-2 ${
                activeTab === tab.key
                  ? "text-primary border-primary"
                  : "border-transparent text-base-content/70 hover:text-primary"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 mb-10 text-base md:text-lg leading-relaxed text-base-content">
        {content[activeTab]
          .trim()
          .split("\n")
          .map((para, idx) => (
            <p key={idx} className="mb-4">
              {para.trim()}
            </p>
          ))}
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-base-100 border border-base-300 rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-primary mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-base-content/80 mb-2">{member.role}</p>
            <p className="text-sm mb-1">
              📧{" "}
              <a
                href={`mailto:${member.email}`}
                className="text-primary hover:underline"
              >
                {member.email}
              </a>
            </p>
            <p className="text-sm">📞 {member.phone}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
