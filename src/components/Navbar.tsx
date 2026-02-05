import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import SocietyJiLogo from "./SocietyJiLogo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  const isHomePage = location.pathname === "/";

  const renderLink = (link: { label: string; href: string }, isMobile = false) => {
    const isInternalAnchor = link.href.startsWith("/#");
    const isCurrentPage = location.pathname === link.href;
    
    const baseClasses = isMobile
      ? "font-medium text-foreground/70 hover:text-primary py-3 block"
      : `font-medium transition-colors ${
          isScrolled || !isHomePage
            ? "text-foreground/70 hover:text-primary"
            : "text-white/80 hover:text-white"
        }`;

    const activeClasses = isCurrentPage ? "text-primary" : "";

    if (isInternalAnchor) {
      if (isHomePage) {
        return (
          <a
            key={link.label}
            href={link.href.replace("/", "")}
            className={`${baseClasses} ${activeClasses}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        );
      }
      return (
        <Link
          key={link.label}
          to={link.href}
          className={`${baseClasses} ${activeClasses}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? "bg-white/95 backdrop-blur-xl shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/">
          <SocietyJiLogo variant={isScrolled || !isHomePage ? "dark" : "light"} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => renderLink(link))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant={isScrolled || !isHomePage ? "ghost" : "heroOutline"}
            size="sm"
          >
            Login
          </Button>
          <Button 
            variant={isScrolled || !isHomePage ? "default" : "hero"} 
            size="sm"
            asChild
          >
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            isScrolled || !isHomePage ? "text-foreground" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-border overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col">
          {navLinks.map((link) => renderLink(link, true))}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border">
            <Button variant="outline" size="default">
              Login
            </Button>
            <Button variant="default" size="default" asChild>
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
