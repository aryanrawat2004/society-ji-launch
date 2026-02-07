import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Lightbulb, Rocket, TrendingUp, FlaskConical, Users, Building } from "lucide-react";
import timelineBgVideo from "@/assets/timeline-bg.mp4";

const milestones = [
  {
    year: "2024",
    quarter: "Q1 – Q3",
    title: "The Spark & Deep R&D",
    description:
      "Identified the pain points of society management firsthand in Jaipur. Spent 8 months researching, interviewing 50+ society secretaries, and building the core platform architecture.",
    icon: Lightbulb,
    gradient: "from-amber-400 to-orange-500",
    highlights: ["Market Research", "Prototype Built", "50+ Interviews"],
  },
  {
    year: "2024",
    quarter: "Q4",
    title: "Beta Testing & Iteration",
    description:
      "Launched closed beta with 3 societies in Mansarovar, Jaipur. Collected real feedback, fixed 100+ issues, and refined the visitor management and billing modules.",
    icon: FlaskConical,
    gradient: "from-blue-400 to-indigo-500",
    highlights: ["3 Beta Societies", "100+ Bugs Fixed", "Core Features Ready"],
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "First Official Launch",
    description:
      "Soft-launched Society Ji with 5 residential societies in Jaipur. Onboarded first paid customers, enabled QR-based visitor management, and automated maintenance billing.",
    icon: Rocket,
    gradient: "from-primary to-purple-600",
    highlights: ["5 Societies Live", "QR Visitor System", "Auto Billing"],
  },
  {
    year: "2025",
    quarter: "Q2 – Q4",
    title: "Steady Growth",
    description:
      "Expanded to 10+ societies with 1,200+ residents. Added guard geo-fencing, community polls, and event management. Word-of-mouth drove organic growth across Jaipur.",
    icon: Users,
    gradient: "from-emerald-400 to-teal-500",
    highlights: ["10+ Societies", "1,200+ Residents", "Guard Monitoring"],
  },
  {
    year: "2026",
    quarter: "Ongoing",
    title: "Scaling & Big Vision",
    description:
      "Expanding beyond Jaipur to Rajasthan's major cities. Building advanced analytics for society admins, integrating smart IoT devices, and aiming for 100+ societies by year-end.",
    icon: TrendingUp,
    gradient: "from-pink-500 to-rose-500",
    highlights: ["Multi-City Expansion", "IoT Integration", "100+ Societies Goal"],
  },
];

const TimelineCard = ({ milestone, index }: { milestone: (typeof milestones)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const Icon = milestone.icon;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.9 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"} pl-16 md:pl-0`}
      >
        <div className="group relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Year badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${milestone.gradient} text-white text-xs font-bold mb-3`}>
              {milestone.year} · {milestone.quarter}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{milestone.description}</p>

            {/* Highlight pills */}
            <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
              {milestone.highlights.map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary/10 text-primary"
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center dot with pulse */}
      <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
          className="relative"
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {/* Animated pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.gradient} opacity-30`}
          />
        </motion.div>
      </div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
};

const AnimatedTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={timelineBgVideo} type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary rounded-full text-sm font-semibold mb-5"
          >
            ✨ Our Journey
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            Building the{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From a simple idea in Jaipur to transforming how societies operate — here's our story so far.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Background line */}
          <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[2px] bg-border/30 md:-translate-x-[1px]" />

          {/* Animated progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[29px] md:left-1/2 top-0 w-[2px] md:-translate-x-[1px] bg-gradient-to-b from-primary via-purple-500 to-pink-500 origin-top"
          />

          {/* Glow on the progress line tip */}
          <motion.div
            style={{ top: lineHeight }}
            className="absolute left-[25px] md:left-1/2 w-[10px] h-[10px] rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary)),0_0_40px_hsl(var(--primary)/0.5)] md:-translate-x-[5px] -translate-y-[5px]"
          />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <TimelineCard key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground text-lg">
            The journey continues… <span className="text-primary font-semibold">and you can be part of it.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedTimeline;
