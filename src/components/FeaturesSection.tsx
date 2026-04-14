import { QrCode, Receipt, Shield, Users, Bell, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: QrCode,
    title: "Visitor Management",
    description: "Instant approvals & QR-based gate security for seamless visitor tracking.",
    gradient: "from-blue-400 to-cyan-300",
    glowColor: "rgba(59, 130, 246, 0.3)",
    delay: 0,
  },
  {
    icon: Receipt,
    title: "Automated Billing",
    description: "Pay maintenance bills, track dues & generate invoices in seconds.",
    gradient: "from-emerald-400 to-teal-300",
    glowColor: "rgba(16, 185, 129, 0.3)",
    delay: 0.1,
  },
  {
    icon: Shield,
    title: "Smart Security",
    description: "Geo-fenced guard monitoring with real-time patrol tracking.",
    gradient: "from-orange-400 to-amber-300",
    glowColor: "rgba(251, 146, 60, 0.3)",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Community Connect",
    description: "Polls, events, notices & directory — keep your society engaged.",
    gradient: "from-pink-400 to-rose-300",
    glowColor: "rgba(244, 114, 182, 0.3)",
    delay: 0.3,
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Push notifications for approvals, emergencies & important updates.",
    gradient: "from-violet-400 to-purple-300",
    glowColor: "rgba(167, 139, 250, 0.3)",
    delay: 0.4,
  },
  {
    icon: MessageSquare,
    title: "Complaint Management",
    description: "Raise, track & resolve complaints with full transparency.",
    gradient: "from-indigo-400 to-blue-300",
    glowColor: "rgba(129, 140, 248, 0.3)",
    delay: 0.5,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(263,84%,10%)]">
      {/* Dark ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[200px]" />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-semibold mb-5 backdrop-blur-sm">
            ✨ Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Why Choose Society<span className="text-purple-400">Ji</span>?
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Everything you need to run your society efficiently, all in one powerful app.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 h-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-md hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-500"
              >
                {/* Glow on hover */}
                <div
                  className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: feature.glowColor }}
                />

                {/* Icon */}
                <div className="relative mb-5">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -8, 8, -4, 4, 0],
                      transition: { duration: 0.6 }
                    }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg shadow-black/20`}
                  >
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.8} />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-white/40 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center text-white/0 group-hover:text-purple-400 transition-all duration-300 text-sm font-medium">
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    Learn more →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: "Societies", value: "10+", icon: "🏘️" },
            { label: "Residents", value: "1,200+", icon: "👥" },
            { label: "Visitors Managed", value: "5,000+", icon: "🎫" },
            { label: "App Rating", value: "4.8★", icon: "⭐" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-center p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm cursor-default"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/40 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
