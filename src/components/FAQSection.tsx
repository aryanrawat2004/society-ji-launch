import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "What is Society Ji?",
    answer: "Society Ji is an all-in-one society management app designed for modern residential communities. It helps manage visitors, payments, security, and communication between residents, guards, and administrators—all from your smartphone."
  },
  {
    question: "Is Society Ji available for both iOS and Android?",
    answer: "Yes! Society Ji is available for download on both the Apple App Store and Google Play Store. You can start using it immediately after downloading."
  },
  {
    question: "How does the visitor management system work?",
    answer: "Residents can pre-approve visitors through the app. When a visitor arrives, the guard scans a QR code or verifies their details instantly. Residents receive real-time notifications and can approve or deny entry with a single tap."
  },
  {
    question: "Is my data secure with Society Ji?",
    answer: "Absolutely. We use bank-grade encryption, geo-fenced security monitoring, and secure cloud storage to protect all your data. Your privacy and security are our top priorities."
  },
  {
    question: "How does the billing and payment feature work?",
    answer: "Admins can generate automated maintenance bills, and residents can pay directly through the app using multiple payment methods. Payment history and receipts are automatically stored for easy reference."
  },
  {
    question: "Can multiple societies use the same app?",
    answer: "Yes! Society Ji supports multiple societies. Each society has its own dedicated space with separate admins, residents, and guards. Users can switch between societies if they belong to more than one."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 customer support through in-app chat, email, and phone. Our dedicated team is always ready to help you with any questions or issues."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 30-day free trial for new societies. During this period, you can explore all features and see how Society Ji transforms your community management."
  }
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-lavender-soft to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-primary rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Society Ji. Can't find the answer you're looking for? 
              Reach out to our support team.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass-card rounded-3xl p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-b border-purple-100 last:border-0"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary py-6 text-base md:text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
