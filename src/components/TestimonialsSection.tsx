import { Star, Quote } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Resident, Sunshine Apartments",
    avatar: "PS",
    rating: 5,
    quote: "Society Ji has completely transformed how we manage our apartment complex. The visitor approval system is so convenient—I can approve guests even when I'm at work!",
    color: "from-purple-400 to-purple-600"
  },
  {
    name: "Rajesh Kumar",
    role: "Secretary, Green Valley Society",
    avatar: "RK",
    rating: 5,
    quote: "As a society admin, billing used to be a nightmare. Now with Society Ji, maintenance collection is automated and transparent. Our collection rate improved by 40%!",
    color: "from-pink-400 to-purple-500"
  },
  {
    name: "Amit Patel",
    role: "Security Guard, Royal Heights",
    avatar: "AP",
    rating: 5,
    quote: "The app makes my job so much easier. No more maintaining registers—everything is digital and I can verify visitors instantly with QR codes.",
    color: "from-indigo-400 to-purple-600"
  },
  {
    name: "Sneha Reddy",
    role: "Resident, Tech Park Residency",
    avatar: "SR",
    rating: 5,
    quote: "I love how I can see all society notices, polls, and events in one place. The community feels more connected now. Best society app we've used!",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Vikram Singh",
    role: "Chairman, Lakeside Towers",
    avatar: "VS",
    rating: 5,
    quote: "We evaluated 5 different apps before choosing Society Ji. The features, support, and ease of use are unmatched. Highly recommended for any society!",
    color: "from-violet-400 to-purple-600"
  },
  {
    name: "Anita Desai",
    role: "Resident, Palm Grove Apartments",
    avatar: "AD",
    rating: 5,
    quote: "The instant notifications when someone arrives at the gate give me peace of mind. I always know who's entering the society. Fantastic security feature!",
    color: "from-fuchsia-400 to-purple-500"
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
          {testimonial.avatar}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          <div className="flex gap-1 mt-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <Quote className="w-10 h-10 text-purple-200 group-hover:text-purple-300 transition-colors" />
      </div>
      <p className="text-muted-foreground leading-relaxed italic">
        "{testimonial.quote}"
      </p>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-primary rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Loved by <span className="text-primary">1,200+</span> Residents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our community members say about their experience with Society<span className="text-primary font-semibold">Ji</span>
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Stats Row */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "1,200+", label: "Happy Residents" },
              { value: "10+", label: "Societies" },
              { value: "4.8", label: "App Rating" },
              { value: "5,000+", label: "Visitors Managed" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-lavender-soft"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
