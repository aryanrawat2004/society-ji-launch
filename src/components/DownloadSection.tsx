import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const DownloadSection = () => {
  return (
    <section id="download" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-purple-700" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Society?
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join growing societies in Jaipur already using Society<span className="text-white font-bold">Ji</span>. Download now and experience smart community living.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="xl"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-lg group"
            >
              <Apple className="w-6 h-6 mr-2" />
              <div className="text-left">
                <div className="text-[10px] font-normal opacity-80">Download on the</div>
                <div className="text-base font-semibold -mt-1">App Store</div>
              </div>
            </Button>
            
            <Button
              variant="hero"
              size="xl"
              className="bg-white text-primary hover:bg-white/90 hover:shadow-lg group"
            >
              <Smartphone className="w-6 h-6 mr-2" />
              <div className="text-left">
                <div className="text-[10px] font-normal opacity-80">Get it on</div>
                <div className="text-base font-semibold -mt-1">Google Play</div>
              </div>
            </Button>
          </div>

          {/* QR Code Hint */}
          <p className="mt-8 text-white/60 text-sm">
            Or scan the QR code in our app to invite your society
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DownloadSection;
