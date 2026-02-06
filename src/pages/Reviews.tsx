import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Reviews = () => {
  return (
    <PageTransition>
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Reviews;
