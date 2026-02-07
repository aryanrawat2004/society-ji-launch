import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import societyJiLogo from "@/assets/society-ji-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "/#features" },
      { label: "Reviews", href: "/reviews" },
      { label: "FAQ", href: "/#faq" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about#team" },
      { label: "Blog", href: "#" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  const renderLink = (link: { label: string; href: string }) => {
    if (link.href.startsWith("/") && !link.href.startsWith("/#")) {
      return (
        <Link
          to={link.href}
          className="text-white/60 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        href={link.href}
        className="text-white/60 hover:text-primary transition-colors"
      >
        {link.label}
      </a>
    );
  };

  return (
    <footer className="bg-foreground text-white/80 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={societyJiLogo} 
                alt="Society Ji Logo" 
                className="w-10 h-10 rounded-xl"
              />
              <span className="text-xl font-bold text-white">
                Society<span className="text-purple-400">Ji</span>
              </span>
            </div>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              Smart community management for modern residential societies. Making everyday living easier, safer, and more connected.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@societyji.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a href="tel:+917300426820" className="hover:text-primary transition-colors">+91 73004 26820</a>
                  <span className="text-white/30">|</span>
                  <a href="tel:+917230995101" className="hover:text-primary transition-colors">+91 72309 95101</a>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/MimXtrmLczLb9bk87" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-start gap-3 hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">
                  09, opposite Sunny Trade Center, Gangaram Nagar, New Aatish Market, RHB Colony, Mansarovar, Jaipur, Rajasthan 302020
                  <span className="block text-primary/70 group-hover:text-primary text-xs mt-1">📍 View on Google Maps →</span>
                </span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} Society<span className="text-primary">Ji</span>. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
