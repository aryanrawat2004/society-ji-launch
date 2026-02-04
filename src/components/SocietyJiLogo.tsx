import { Home } from "lucide-react";

const SocietyJiLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-glass">
        <Home className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-foreground">
        Society<span className="text-primary">Ji</span>
      </span>
    </div>
  );
};

export default SocietyJiLogo;
