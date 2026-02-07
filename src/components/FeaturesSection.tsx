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
            <span className="gradient-text">Society</span><span className="text-primary">Ji</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to run your society efficiently, all in one powerful app.
          </p>
        </AnimatedSection>

        {/* Bento Grid - Responsive for all devices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bento-card glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-4 right-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Societies", value: "10+" },
            { label: "Residents", value: "1,200+" },
            { label: "Visitors Managed", value: "5,000+" },
            { label: "App Rating", value: "4.8★" },
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
