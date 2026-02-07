import { Target, Heart, Shield, Users, Lightbulb, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedTimeline from "@/components/AnimatedTimeline";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Kushagra Tandon",
    role: "Founder & CEO",
    avatar: "KT",
    bio: "Passionate about solving real community problems through technology. Started SocietyJi from firsthand frustration with society management in Jaipur.",
    gradient: "from-primary to-purple-600"
  },
  {
    name: "Sarthak Jhalani",
    role: "Co-Founder & CTO",
    avatar: "SJ",
    bio: "Tech architect who leads the engineering vision. Builds scalable, reliable systems that power thousands of residents daily.",
    gradient: "from-blue-500 to-cyan-500"
  },
];

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "Every feature we build starts with the question: 'How does this make community living better?'"
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your data and privacy are sacred. We use bank-grade security to protect every piece of information."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push boundaries to bring smart, modern solutions to traditional society management."
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Our app is designed for everyone—from tech-savvy youth to senior residents."
  }
];

// milestones moved to AnimatedTimeline component

const About = () => {
  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Building the Future of <span className="text-primary">Community Living</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We're on a mission to make residential community management effortless, secure, and connected. 
                Society<span className="text-primary font-semibold">Ji</span> is more than an app—it's a movement towards smarter living.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimatedSection>
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  From Frustration to <span className="text-primary">Innovation</span>
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    It all started when our founder, Kushagra, experienced the chaos of society management firsthand. 
                    What should have been an exciting new chapter quickly became a headache—managing visitors 
                    meant phone calls at odd hours, maintenance payments required standing in queues, and 
                    getting society updates was nearly impossible.
                  </p>
                  <p>
                    "There has to be a better way," he thought. That simple frustration sparked a vision: 
                    what if managing society life was as easy as ordering food online?
                  </p>
                  <p>
                    Together with co-founder Sarthak Jhalani and a small but dedicated tech team, 
                    Society<span className="text-primary font-semibold">Ji</span> was born in Jaipur. Starting with just a handful of pilot societies, we've grown to 
                    serve 10+ societies and 1,200+ residents.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <div className="glass-card rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: "10+", label: "Societies" },
                      { value: "1,200+", label: "Residents" },
                      { value: "Jaipur", label: "City" },
                      { value: "4.8★", label: "App Rating" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-4 rounded-2xl bg-background">
                        <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-lavender-soft to-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-8">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                "To empower every residential community in India with technology that makes daily living 
                <span className="text-primary font-semibold"> safer, simpler, and more connected</span>—
                one society at a time."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Simplify Management", "Enhance Security", "Build Community", "Save Time"].map((item, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 rounded-full bg-white border border-primary/20 text-foreground text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide every decision we make and every feature we build.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline - Animated Video Style */}
      <AnimatedTimeline />

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                The Founders Behind Society<span className="text-primary">Ji</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A small, focused team building something meaningful for communities.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-6 text-center hover:shadow-lg transition-all group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg group-hover:scale-105 transition-transform`}>
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-purple-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <Award className="w-16 h-16 text-white/80 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join Our Growing Family
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Whether you're a society looking for a better management solution or a talented individual 
                wanting to make a difference—we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors"
                >
                  Get Started Today
                </a>
                <a 
                  href="mailto:careers@societyji.com" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  View Careers
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default About;
