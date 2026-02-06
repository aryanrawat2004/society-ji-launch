import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";
import LoginCard from "@/components/LoginCard";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <section id="login" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Login to your Society Ji account
              </h2>
              <p className="text-muted-foreground">
                Same login form for admin and users. Select your role and continue.
              </p>
            </div>
            <LoginCard className="w-full" />
          </div>
        </div>
      </section>
      <FeaturesSection />
      <FAQSection />
      <DownloadSection />
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Index;
