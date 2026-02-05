import { Settings, ShieldCheck, User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const roles = [
  {
    icon: Settings,
    title: "For Admins",
    description: "Automate billing & manage complaints effortlessly. Get real-time insights and analytics for your society.",
    features: ["Automated billing", "Complaint management", "Analytics dashboard", "Staff management"],
    gradient: "from-primary to-purple-600",
  },
  {
    icon: ShieldCheck,
    title: "For Guards",
    description: "Easy entry logs with zero paperwork. Digital gatekeeping made simple and secure.",
    features: ["Quick visitor check-in", "Digital logbooks", "Alert notifications", "Geo-tracking"],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: User,
    title: "For Residents",
    description: "One-tap approvals & community updates. Stay connected with your neighbors.",
    features: ["Instant approvals", "Bill payments", "Community forum", "Event calendar"],
    gradient: "from-orange-500 to-pink-500",
  },
];

const UserRolesSection = () => {
  return (
    <section id="roles" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Built For Everyone
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            One App,{" "}
            <span className="gradient-text">Three Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tailored interfaces for every role in your society
          </p>
        </AnimatedSection>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative rounded-3xl bg-card p-8 border-2 border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-glass-lg"
            >
              {/* Gradient Top Border */}
              <div
                className={`absolute top-0 left-8 right-8 h-1 rounded-full bg-gradient-to-r ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${role.gradient} shadow-lg`}
              >
                <role.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {role.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {role.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {role.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserRolesSection;
