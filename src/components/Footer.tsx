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
      { label: "Privacy Policy", href: "/privacy-policy.html" },
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
        <Link to={link.href} className="text-white/30 hover:text-purple-400 transition-colors duration-300">
          {link.label}
        </Link>
      );
    }
    return (
      <a href={link.href} className="text-white/30 hover:text-purple-400 transition-colors duration-300">
        {link.label}
      </a>
    );
  };

  return (
    <footer className="relative bg-[hsl(263,84%,6%)] pt-16 pb-8 overflow-hidden">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={societyJiLogo} alt="Society Ji Logo" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold text-white">
                Society<span className="text-purple-400">Ji</span>
              </span>
            </div>
            <p className="text-white/25 mb-6 max-w-sm leading-relaxed">
              Smart community management for modern residential societies. Making everyday living easier, safer, and
              more connected.
            </p>
            <div className="space-y-3 text-sm text-white/40">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-400/60" />
                <span>hello@societyji.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-purple-400/60" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a href="tel:+917300426820" className="hover:text-purple-400 transition-colors">
                    +91 73004 26820
                  </a>
                  <span className="text-white/15">|</span>
                  <a href="tel:+917230995101" className="hover:text-purple-400 transition-colors">
                    +91 72309 95101
                  </a>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/MimXtrmLczLb9bk87"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 hover:text-purple-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-purple-400/60 mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">
                  09, opposite Sunny Trade Center, Gangaram Nagar, New Aatish Market, RHB Colony, Mansarovar, Jaipur,
                  Rajasthan 302020
                </span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-white/60 text-sm uppercase tracking-wider mb-5">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/60 text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/60 text-sm uppercase tracking-wider mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.05] pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm">
              © {currentYear} Society<span className="text-purple-400/60">Ji</span>. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-purple-500/10 hover:border-purple-500/20 flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 text-white/30" />
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
