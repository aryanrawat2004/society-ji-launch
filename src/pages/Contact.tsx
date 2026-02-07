import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone must be at least 10 digits").max(15, "Phone must be less than 15 digits"),
  society: z.string().trim().min(1, "Society name is required").max(200, "Society name must be less than 200 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    society: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

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

    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: "Demo Request Submitted!",
      description: "Our team will contact you within 24 hours.",
    });
  };

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to transform your society? Request a demo or reach out to our team.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-3xl p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your demo request has been submitted. Our team will contact you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Request a Demo</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Society Name *</label>
                        <Input
                          name="society"
                          value={formData.society}
                          onChange={handleChange}
                          placeholder="Your society or apartment name"
                          className={errors.society ? "border-red-500" : ""}
                        />
                        {errors.society && <p className="text-red-500 text-sm mt-1">{errors.society}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Message (Optional)</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your society's needs..."
                          rows={4}
                          className={errors.message ? "border-red-500" : ""}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Request Demo
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <p className="text-muted-foreground">hello@societyji.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+91 73004 26820 | +91 72309 95101</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Office</h3>
                      <p className="text-muted-foreground">
                        09, opposite Sunny Trade Center, Gangaram Nagar,<br />
                        New Aatish Market, RHB Colony, Mansarovar,<br />
                        Jaipur, Rajasthan 302020
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Preview */}
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-50 border border-primary/10">
                  <h3 className="font-semibold text-foreground mb-2">Have Questions?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Check out our FAQ section for quick answers to common questions.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/#faq">View FAQ</a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
  );
};

export default Contact;
