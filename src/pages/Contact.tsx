import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15, "Phone must be less than 15 digits"),
  society: z.string().trim().min(1, "Society name is required").max(200, "Society name must be less than 200 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
  type: z.string().optional(),
});

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "hello@societyji.com",
    href: "mailto:hello@societyji.com",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    contact: "+91 73004 26820",
    href: "tel:+917300426820",
    gradient: "from-green-500 to-teal-600"
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "Quick chat on WhatsApp",
    contact: "+91 72309 95101",
    href: "https://wa.me/917230995101",
    gradient: "from-green-400 to-green-600"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    contact: "Jaipur, Rajasthan",
    href: "https://maps.google.com/?q=09,+opposite+Sunny+Trade+Center,+Gangaram+Nagar,+New+Aatish+Market,+RHB+Colony,+Mansarovar,+Jaipur,+Rajasthan+302020",
    gradient: "from-red-500 to-pink-600"
  }
];

const workingHours = [
  { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Closed" }
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    society: '',
    message: '',
    type: 'demo'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check for email redirect on page load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect === 'email' || window.location.href.includes('hello@societyji.com')) {
      // Highlight email contact method
      const emailElement = document.getElementById('email-contact');
      if (emailElement) {
        emailElement.scrollIntoView({ behavior: 'smooth' });
        emailElement.classList.add('highlight-pulse');
      }
      
      toast({
        title: "📧 Email Contact",
        description: "You can reach us directly at hello@societyji.com or use the form below.",
      });
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', society: '', message: '', type: 'demo' });
    
    toast({
      title: "✨ Message Sent Successfully!",
      description: "Our team will contact you within 24 hours.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Futuristic Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-600/20 to-background/40 z-10" />
          <div 
            className="w-full h-full opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 119, 255, 0.2) 0%, transparent 50%)
              `,
              animation: 'float 6s ease-in-out infinite'
            }}
          />
          
          {/* Animated particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20">
          <Navbar />
          
          {/* Hero Section */}
          <section className="pt-32 pb-20 relative">
            <div className="container mx-auto px-4">
              <AnimatedSection>
                <div className="text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-600/20 backdrop-blur-sm rounded-full text-primary font-medium mb-8 border border-primary/30"
                  >
                    <Globe className="w-4 h-4 inline mr-2" />
                    Get In Touch
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
                  >
                    Let's Build the
                    <span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Future Together
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8"
                  >
                    Have questions? Need support? Want to join our mission?
                    <br />
                    <span className="text-primary font-semibold">We're here to help 24/7.</span>
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3"
                  >
                    {["Support", "Demo Request", "Partnership", "Careers", "Feedback"].map((tag, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-foreground text-sm font-medium hover:bg-white/20 transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <AnimatedSection>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Choose Your Preferred Way
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Multiple ways to reach us. Pick what works best for you.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    id={method.title === "Email Us" ? "email-contact" : undefined}
                    href={method.href}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/20 hover:border-primary/40 transition-all hover:shadow-2xl"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                    <p className="text-primary font-semibold text-sm">{method.contact}</p>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
                
                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <AnimatedSection>
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                      {isSubmitted ? (
                        <div className="text-center py-12">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
                          >
                            <CheckCircle className="w-10 h-10 text-green-500" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                          <p className="text-muted-foreground mb-6">
                            Your message has been sent successfully. Our team will contact you within 24 hours.
                          </p>
                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground hover:bg-white/20 transition-all"
                          >
                            Send Another Message
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                            <Send className="w-6 h-6 mr-3 text-primary" />
                            Send us a Message
                          </h3>
                          
                          <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Full Name *
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                  placeholder="Enter your full name"
                                />
                                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Email Address *
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                  placeholder="your.email@example.com"
                                />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  name="phone"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                  placeholder="+91 98765 43210"
                                />
                                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                  Society Name *
                                </label>
                                <input
                                  type="text"
                                  name="society"
                                  value={formData.society}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                  placeholder="Your society or apartment name"
                                />
                                {errors.society && <p className="text-red-400 text-sm mt-1">{errors.society}</p>}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Inquiry Type
                              </label>
                              <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                              >
                                <option value="demo">Demo Request</option>
                                <option value="support">Technical Support</option>
                                <option value="partnership">Partnership</option>
                                <option value="careers">Careers</option>
                                <option value="general">General Inquiry</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-foreground mb-2">
                                Message
                              </label>
                              <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                placeholder="Tell us how we can help you..."
                              />
                              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                            </div>

                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-4 rounded-xl hover:from-primary/90 hover:to-purple-600/90 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  <span>Sending...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-5 h-5" />
                                  <span>Send Message</span>
                                  <ArrowRight className="w-5 h-5" />
                                </>
                              )}
                            </motion.button>
                          </form>
                        </>
                      )}
                    </div>
                  </AnimatedSection>
                </div>

                {/* Additional Info */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Working Hours */}
                  <AnimatedSection delay={0.2}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                      <h4 className="text-xl font-bold text-foreground mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-primary" />
                        Working Hours
                      </h4>
                      <div className="space-y-3">
                        {workingHours.map((schedule, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">{schedule.day}</span>
                            <span className="text-foreground font-medium text-sm">{schedule.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Response Time */}
                  <AnimatedSection delay={0.3}>
                    <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 backdrop-blur-sm rounded-3xl p-6 border border-primary/30">
                      <h4 className="text-xl font-bold text-foreground mb-3">⚡ Quick Response</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        We typically respond within 2-4 hours during business hours.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                          <span className="text-foreground">Email: Within 4 hours</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                          <span className="text-foreground">WhatsApp: Within 1 hour</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                          <span className="text-foreground">Phone: Immediate</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Emergency Contact */}
                  <AnimatedSection delay={0.4}>
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-3xl p-6 border border-red-500/30">
                      <h4 className="text-xl font-bold text-foreground mb-3">🚨 Emergency Support</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        For urgent technical issues affecting your society operations:
                      </p>
                      <a 
                        href="tel:+917300426820"
                        className="inline-flex items-center text-red-500 font-semibold hover:text-red-400 transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        +91 73004 26820
                      </a>
                    </div>
                  </AnimatedSection>

                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-gradient-to-b from-transparent to-primary/5">
            <div className="container mx-auto px-4">
              <AnimatedSection>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Quick answers to common questions about SocietyJi.
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  {
                    q: "How quickly can we get started?",
                    a: "Setup takes just 24-48 hours after initial consultation. Our team handles everything."
                  },
                  {
                    q: "Is there a mobile app?",
                    a: "Yes! SocietyJi has dedicated mobile apps for both Android and iOS with full functionality."
                  },
                  {
                    q: "What about data security?",
                    a: "We use bank-grade encryption and comply with all Indian data protection regulations."
                  },
                  {
                    q: "Do you provide training?",
                    a: "Absolutely! We provide comprehensive training for admins and residents during onboarding."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-primary/40 transition-all"
                  >
                    <h4 className="font-bold text-foreground mb-3">{faq.q}</h4>
                    <p className="text-muted-foreground text-sm">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .highlight-pulse {
            animation: highlightPulse 2s ease-in-out 3;
          }
          
          @keyframes highlightPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(120, 119, 198, 0); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(120, 119, 198, 0.3); }
          }
        `}</style>
      </div>
    </PageTransition>
  );
};

export default Contact;