import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const DownloadSection = () => {
  return (
    <section id="download" className="py-24 md:py-32 relative overflow-hidden bg-[hsl(263,84%,12%)]">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[150px]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Transform Your Society?
          </h2>
          <p className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join growing societies in Jaipur already using Society<span className="text-purple-400 font-bold">Ji</span>. Download now and experience smart community living.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03, y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button
                variant="hero"
                size="xl"
                className="bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 backdrop-blur-sm group w-full sm:w-auto"
              >
                <Apple className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="text-[10px] font-normal text-white/50">Download on the</div>
                  <div className="text-base font-semibold -mt-1">App Store</div>
                </div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03, y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
              <Button
                variant="hero"
                size="xl"
                className="bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 backdrop-blur-sm group w-full sm:w-auto"
              >
                <Smartphone className="w-6 h-6 mr-3" />
                <div className="text-left">
                  <div className="text-[10px] font-normal text-white/50">Get it on</div>
                  <div className="text-base font-semibold -mt-1">Google Play</div>
                </div>
              </Button>
            </motion.div>
          </div>

          <p className="mt-10 text-white/20 text-sm">
            Or scan the QR code in our app to invite your society
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
