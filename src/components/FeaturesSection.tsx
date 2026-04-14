import { useState, useRef } from "react";
import { QrCode, Receipt, Shield, Users, Bell, MessageSquare, X, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import featuresBgVideo from "@/assets/features-bg.mp4.asset.json";

const features = [
  {
    icon: QrCode,
    title: "Visitor Management",
    shortDesc: "QR-based gate security",
    description:
      "Instant approvals & QR-based gate security for seamless visitor tracking. Pre-approve guests, generate digital passes, and monitor entry/exit in real-time.",
    gradient: "from-blue-500 to-cyan-400",
    bgGradient: "from-blue-500/20 to-cyan-400/10",
    glowColor: "rgba(59, 130, 246, 0.4)",
    highlights: ["QR Gate Pass", "Pre-Approval", "Real-Time Logs", "Guest History"],
  },
  {
    icon: Receipt,
    title: "Automated Billing",
    shortDesc: "Smart invoicing system",
    description:
      "Pay maintenance bills, track dues & generate invoices in seconds. Automated reminders, multiple payment modes, and transparent financial tracking.",
    gradient: "from-emerald-500 to-teal-400",
    bgGradient: "from-emerald-500/20 to-teal-400/10",
    glowColor: "rgba(16, 185, 129, 0.4)",
    highlights: ["Auto Invoices", "Payment Tracking", "Due Reminders", "Reports"],
  },
  {
    icon: Shield,
    title: "Smart Security",
    shortDesc: "Geo-fenced guard monitoring",
    description:
      "Geo-fenced guard monitoring with real-time patrol tracking. Ensure 24/7 security with automated check-in points and instant alert system.",
    gradient: "from-orange-500 to-amber-400",
    bgGradient: "from-orange-500/20 to-amber-400/10",
    glowColor: "rgba(251, 146, 60, 0.4)",
    highlights: ["GPS Tracking", "Patrol Routes", "SOS Alerts", "Guard Logs"],
  },
  {
    icon: Users,
    title: "Community Connect",
    shortDesc: "Engage your society",
    description:
      "Polls, events, notices & directory — keep your society engaged. Build a vibrant community with discussion forums, event planning, and shared resources.",
    gradient: "from-pink-500 to-rose-400",
    bgGradient: "from-pink-500/20 to-rose-400/10",
    glowColor: "rgba(244, 114, 182, 0.4)",
    highlights: ["Events", "Polls & Surveys", "Notice Board", "Directory"],
  },
  {
    icon: Bell,
    title: "Instant Alerts",
    shortDesc: "Never miss an update",
    description:
      "Push notifications for approvals, emergencies & important updates. Stay informed with customizable notification preferences and priority alerts.",
    gradient: "from-violet-500 to-purple-400",
    bgGradient: "from-violet-500/20 to-purple-400/10",
    glowColor: "rgba(167, 139, 250, 0.4)",
    highlights: ["Push Alerts", "Emergency SOS", "Custom Prefs", "Priority"],
  },
  {
    icon: MessageSquare,
    title: "Complaint Management",
    shortDesc: "Transparent resolution",
    description:
      "Raise, track & resolve complaints with full transparency. Categorize issues, assign to teams, and track resolution progress with photo evidence.",
    gradient: "from-indigo-500 to-blue-400",
    bgGradient: "from-indigo-500/20 to-blue-400/10",
    glowColor: "rgba(129, 140, 248, 0.4)",
    highlights: ["Ticket System", "Photo Evidence", "Status Tracking", "Resolution"],
  },
];

const stats = [
  { label: "Societies", value: "10+", icon: "🏘️" },
  { label: "Residents", value: "1,200+", icon: "👥" },
  { label: "Visitors Managed", value: "5,000+", icon: "🎫" },
  { label: "App Rating", value: "4.8★", icon: "⭐" },
];

// Feature detail overlay component
const FeatureDetail = ({
  feature,
  onClose,
}: {
  feature: (typeof features)[0];
  onClose: () => void;
}) => {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
      >
        {/* Glow behind card */}
        <div
          className="absolute -inset-4 rounded-3xl blur-3xl opacity-40"
          style={{ background: feature.glowColor }}
        />

        <div className="relative bg-[hsl(263,60%,12%)]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15, delay: 0.1 }}
            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-2xl`}
          >
            <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold text-white mb-3"
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 leading-relaxed mb-6"
          >
            {feature.description}
          </motion.p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3">
            {feature.highlights.map((highlight, i) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.08 }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r ${feature.bgGradient} border border-white/5`}
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                <span className="text-sm text-white/80 font-medium">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Individual feature card
const FeatureCard = ({
  feature,
  index,
  onClick,
}: {
  feature: (typeof features)[0];
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 h-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-md hover:border-white/[0.15] hover:bg-white/[0.07] transition-all duration-500 overflow-hidden">
        {/* Animated corner glow on hover */}
        <motion.div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
          style={{ background: feature.glowColor }}
        />

        {/* Bottom gradient line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Icon with animation */}
        <div className="relative mb-5">
          <motion.div
            whileHover={{
              scale: 1.15,
              rotate: [0, -8, 8, -4, 0],
            }}
            transition={{ duration: 0.5 }}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} shadow-lg`}
            style={{
              boxShadow: `0 8px 32px ${feature.glowColor}`,
            }}
          >
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.8} />
          </motion.div>

          {/* Floating sparkle */}
          <motion.div
            animate={{
              y: [-2, 2, -2],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className={`w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors duration-500`} />
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-white transition-colors">
          {feature.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/30 font-medium mb-2">{feature.shortDesc}</p>
        <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
          {feature.description}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-1 text-white/0 group-hover:text-white/70 transition-all duration-300 text-sm font-medium">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={featuresBgVideo.url} type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[hsl(263,84%,8%)]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(263,84%,8%)] via-transparent to-[hsl(263,84%,8%)]" />
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-primary/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[180px]"
        />
      </div>

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 py-24 md:py-32">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            Powerful Features
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Why Choose Society<span className="text-primary">Ji</span>?
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Tap on any feature to explore how Society<span className="text-primary font-medium">Ji</span> transforms your society management.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              onClick={() => setSelectedFeature(index)}
            />
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm cursor-default group"
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
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

      {/* Feature Detail Overlay */}
      <AnimatePresence>
        {selectedFeature !== null && (
          <FeatureDetail
            feature={features[selectedFeature]}
            onClose={() => setSelectedFeature(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturesSection;
