import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

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
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(263,84%,8%)]">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-sm font-medium mb-5 backdrop-blur-sm">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Frequently Asked <span className="text-purple-400">Questions</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Everything you need to know about Society<span className="text-purple-400 font-semibold">Ji</span>. Can't find the answer? Reach out to our support team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl p-6 md:p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-white/[0.06] last:border-0"
              >
                <AccordionTrigger className="text-left text-white/80 hover:text-purple-300 py-6 text-base md:text-lg font-medium transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/40 pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
