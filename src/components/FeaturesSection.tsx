import { QrCode, Receipt, Shield, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const features = [
  {
    icon: QrCode,
    title: "Visitor Management",
    description: "Instant approvals & gate security",
    gradient: "from-blue-500 to-cyan-400",
    size: "large",
  },
  {
    icon: Receipt,
    title: "Automated Billing",
    description: "Pay maintenance in seconds",
    gradient: "from-emerald-500 to-teal-400",
    size: "small",
  },
  {
    icon: Shield,
    title: "Smart Security",
    description: "Geo-fenced guard monitoring",
    gradient: "from-orange-500 to-amber-400",
    size: "small",
  },
  {
    icon: Users,
    title: "Community Connect",
    description: "Polls, Events, and Notices",
    gradient: "from-pink-500 to-rose-400",
    size: "large",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-lavender-gradient">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Why Choose{" "}
            <span className="gradient-text">Society Ji?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to run your society efficiently, all in one powerful app.
          </p>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bento-card glass-card rounded-3xl p-6 md:p-8 ${
                feature.size === "large" ? "lg:col-span-2" : ""
              }`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Societies", value: "500+" },
            { label: "Residents", value: "50K+" },
            { label: "Transactions", value: "₹10Cr+" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm"
            >
              <div className="text-2xl md:text-3xl font-extrabold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
