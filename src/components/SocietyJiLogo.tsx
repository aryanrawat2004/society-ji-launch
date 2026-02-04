import societyJiLogo from "@/assets/society-ji-logo.png";

interface SocietyJiLogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const SocietyJiLogo = ({ className = "", variant = "dark" }: SocietyJiLogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={societyJiLogo} 
        alt="Society Ji Logo" 
        className="w-10 h-10 rounded-xl"
      />
      <span className={`text-xl font-bold ${variant === "light" ? "text-white" : "text-foreground"}`}>
        Society<span className="text-primary">Ji</span>
      </span>
    </div>
  );
};

export default SocietyJiLogo;
