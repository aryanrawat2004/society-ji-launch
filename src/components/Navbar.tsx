import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocietyJiLogo from "./SocietyJiLogo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  const isHomePage = location.pathname === "/";

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const renderLink = (link: { label: string; href: string }, isMobile = false) => {
    const isInternalAnchor = link.href.startsWith("/#");
    const isCurrentPage = link.href === "/" ? location.pathname === "/" : location.pathname === link.href;

    const desktopClasses = `relative font-medium text-sm tracking-wide transition-all duration-300 py-1 ${
      isScrolled || !isHomePage
        ? isCurrentPage
          ? "text-primary"
          : "text-foreground/70 hover:text-primary"
        : isCurrentPage
          ? "text-white"
          : "text-white/70 hover:text-white"
    }`;

    const mobileClasses = `flex items-center justify-between font-medium text-foreground/80 hover:text-primary py-3.5 px-4 rounded-xl transition-all duration-200 ${
      isCurrentPage ? "text-primary bg-primary/5" : "hover:bg-muted/50"
    }`;

    const baseClasses = isMobile ? mobileClasses : desktopClasses;

    const content = (
      <>
        {link.label}
        {isMobile && <ChevronRight className="w-4 h-4 opacity-40" />}
      </>
    );

    if (isInternalAnchor) {
      if (isHomePage) {
        return (
          <a
            key={link.label}
            href={link.href.replace("/", "")}
            className={baseClasses}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link key={link.label} to={link.href} className={baseClasses} onClick={() => setIsMobileMenuOpen(false)}>
          {content}
        </Link>
      );
    }

    return (
      <Link key={link.label} to={link.href} className={baseClasses} onClick={() => setIsMobileMenuOpen(false)}>
        {content}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled || !isHomePage
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(0,0,0,0.04)] py-2.5"
          : "bg-white/[0.03] backdrop-blur-md py-4"
      }`}
    >
      {/* Subtle bottom border glow */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          isScrolled || !isHomePage ? "opacity-100" : "opacity-30"
        }`}
        style={{
          background: isScrolled || !isHomePage
            ? "linear-gradient(90deg, transparent, hsl(262 83% 58% / 0.2), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="relative group cursor-pointer"
        >
          <SocietyJiLogo variant={isScrolled || !isHomePage ? "dark" : "light"} />
          {/* Logo hover glow */}
          <div className="absolute -inset-3 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-300" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <div
            className={`flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
              isScrolled || !isHomePage
                ? "bg-muted/50"
                : "bg-white/[0.08] backdrop-blur-sm"
            }`}
          >
            {navLinks.map((link) => (
              <div key={link.label} className="px-3 py-1">
                {renderLink(link)}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            variant={isScrolled || !isHomePage ? "ghost" : "heroOutline"}
            size="sm"
            className={`${
              isScrolled || !isHomePage
                ? "border border-border hover:border-primary/30"
                : "border-white/20"
            } transition-all duration-300`}
            asChild
          >
            <Link to="/login">Login</Link>
          </Button>
          <Button
            variant={isScrolled || !isHomePage ? "default" : "hero"}
            size="sm"
            className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
            asChild
          >
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden relative p-2.5 rounded-xl transition-all duration-300 ${
            isScrolled || !isHomePage
              ? "text-foreground hover:bg-muted/60"
              : "text-white hover:bg-white/10"
          }`}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-400 ease-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-3 mt-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] border border-border/50 overflow-hidden">
          <div className="p-3 flex flex-col">
            {navLinks.map((link) => renderLink(link, true))}
          </div>
          <div className="p-3 pt-0 border-t border-border/50 mt-1">
            <div className="flex flex-col gap-2.5 pt-3">
              <Button variant="outline" size="default" className="w-full justify-center" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" size="default" className="w-full justify-center shadow-lg shadow-primary/20" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
