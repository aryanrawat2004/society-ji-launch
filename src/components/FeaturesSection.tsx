import { QrCode, Receipt, Shield, Users, Bell, FileText, MapPin, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: QrCode,
    title: "Visitor Management",
    description: "Instant approvals & QR-based gate security for seamless visitor tracking.",
    gradient: "from-blue-500 to-cyan-400",
    bgGlow: "bg-blue-500/20",
    iconBg: "bg-blue-500/10",
    delay: 0,
  },
  {
    icon: Receipt,
    title: "Automated Billing",
    description: "Pay maintenance bills, track dues & generate invoices in seconds.",
    gradient: "from-emerald-500 to-teal-400",
    bgGlow: "bg-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    delay: 0.1,
  },
  {
    icon: Shield,
    title: "Smart Security",
    description: "Geo-fenced guard monitoring with real-time patrol tracking.",
    gradient: "from-orange-500 to-amber-400",
    bgGlow: "bg-orange-500/20",
    iconBg: "bg-orange-500/10",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Community Connect",
    description: "Polls, events, notices & directory — keep your society engaged.",
    gradient: "from-pink-500 to-rose-400",
    bgGlow: "bg-pink-500/20",
    iconBg: "bg-pink-500/10",
    delay: 0.3,
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    description: "Push notifications for approvals, emergencies & important updates.",
    gradient: "from-violet-500 to-purple-400",
    bgGlow: "bg-violet-500/20",
    iconBg: "bg-violet-500/10",
    delay: 0.4,
  },
  {
    icon: MessageSquare,
    title: "Complaint Management",
    description: "Raise, track & resolve complaints with full transparency.",
    gradient: "from-indigo-500 to-blue-400",
    bgGlow: "bg-indigo-500/20",
    iconBg: "bg-indigo-500/10",
    delay: 0.5,
  },
];

const iconAnimation = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: [0, -10, 10, -5, 5, 0],
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
};

const cardAnimation = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const glowAnimation = {
  rest: { opacity: 0, scale: 0.8 },
  hover: { opacity: 1, scale: 1.2, transition: { duration: 0.4 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-lavender-gradient relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            ✨ Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Why Choose Society<span className="text-primary">Ji</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to run your society efficiently, all in one powerful app.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={cardAnimation}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="relative glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 h-full border border-white/40 hover:border-primary/20 transition-colors duration-300"
              >
                {/* Background glow on hover */}
                <motion.div
                  variants={glowAnimation}
                  className={`absolute -top-4 -right-4 w-32 h-32 ${feature.bgGlow} rounded-full blur-2xl pointer-events-none`}
                />

                {/* Icon with animation */}
                <div className="relative mb-5">
                  <motion.div
                    variants={iconAnimation}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg relative z-10`}
                  >
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.8} />
                  </motion.div>
                  {/* Icon reflection */}
                  <div className={`absolute -bottom-2 left-2 w-12 h-4 ${feature.bgGlow} rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Subtle arrow indicator */}
                <div className="mt-4 flex items-center text-primary/0 group-hover:text-primary/70 transition-all duration-300 text-sm font-medium">
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    Learn more →
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
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
              className="text-center p-5 sm:p-6 rounded-2xl glass-card border border-white/30 cursor-default"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
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
