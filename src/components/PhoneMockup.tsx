import { 
  Home, 
  Shield, 
  Bell, 
  Users, 
  QrCode, 
  Settings,
  ChevronRight 
} from "lucide-react";

const PhoneMockup = () => {
  return (
    <div className="relative animate-float">
      {/* Phone Frame */}
      <div className="relative w-[280px] md:w-[320px] h-[580px] md:h-[660px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 phone-shadow">
        {/* Inner Bezel */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-lavender-soft flex items-center justify-between px-6 z-10">
            <span className="text-[10px] font-medium text-foreground/70">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
              <div className="w-4 h-2 rounded-sm bg-primary/60"></div>
            </div>
          </div>

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-20"></div>

          {/* App Content */}
          <div className="pt-10 pb-4 h-full bg-gradient-to-b from-lavender-soft to-white overflow-hidden">
            {/* Header */}
            <div className="flex flex-col items-center pt-4 pb-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-3">
                <Home className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Sunshine Apartments</h3>
              <p className="text-xs text-muted-foreground">Admin User</p>
              <span className="mt-2 px-3 py-1 text-[10px] font-medium text-primary bg-purple-100 rounded-full">
                Secretary View
              </span>
            </div>

            {/* Menu Items */}
            <div className="px-4 space-y-2">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 font-medium text-foreground text-sm">Switch Role</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>

              {[
                { icon: Home, label: "Dashboard", badge: null },
                { icon: Shield, label: "Guards", badge: "6" },
                { icon: Bell, label: "Notices", badge: "5" },
                { icon: Users, label: "Visitors", badge: null },
                { icon: Shield, label: "Security", badge: null },
                { icon: QrCode, label: "Facilities", badge: null },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-3 py-2.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 font-medium text-foreground text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white bg-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Society Overview Card */}
            <div className="mx-4 mt-4 p-4 bg-white rounded-2xl shadow-sm border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground text-sm">Society Overview</span>
                <ChevronRight className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Total Flats</span>
                  <span className="font-semibold text-primary">120</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Residents</span>
                  <span className="font-semibold text-primary">98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400/30 rounded-full blur-3xl"></div>
    </div>
  );
};

export default PhoneMockup;
