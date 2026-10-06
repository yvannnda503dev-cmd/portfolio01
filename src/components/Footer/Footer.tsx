import { motion } from "framer-motion";
import { Github, Mail, Phone, ArrowUp, Lock, Unlock } from "lucide-react";
import { MorphingText } from "../lightswind/morphing-text";
import { usePortfolio } from "../../context/PortfolioContext";

export const Footer = () => {
  const { data, isAuthenticated, setIsAuthModalOpen, setIsDashboardOpen } = usePortfolio();

  const handleOpenDashboard = () => {
    if (isAuthenticated) {
      setIsDashboardOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const morphingTexts = [
    "Développeur Front-End",
    "Développeur Back-End",
    "Intégrateur Web",
    "Full-Stack Developer",
    data.profile.name,
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Accueil", href: "#hero" },
    { name: "À propos", href: "#about" },
    { name: "Parcours", href: "#career" },
    { name: "Projets", href: "#projects" },
    { name: "Formation", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: data.profile.github || "https://github.com/yvannnda503dev-cmd", label: "GitHub", external: true },
    { icon: Mail, href: `mailto:${data.profile.email}`, label: "Email", external: false },
    { icon: Phone, href: `tel:${data.profile.phone.replace(/\s+/g, "")}`, label: "Téléphone", external: false },
  ];

  return (
    <footer className="w-full relative z-10 pt-12 sm:pt-16 pb-32 md:pb-36 bg-card/60 backdrop-blur-2xl border-t border-black/5 dark:border-white/10 shadow-2xl rounded-t-[2.5rem] sm:rounded-t-[3rem] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 flex flex-col gap-8 sm:gap-10">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-primary/20">
              <img src="/NDADEV_logo.png" alt="NDADEV Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold tracking-tight text-foreground text-base leading-none">
                {data.profile.name}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                {data.profile.role}
              </span>
            </div>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-black/5 dark:border-white/10 text-xs font-bold text-foreground hover:text-primary hover:border-primary/40 transition-all shadow-sm cursor-pointer"
          >
            <span>Haut de page</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Morphing Text Banner */}
        <div className="py-12 px-6 rounded-3xl bg-black/[0.015] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 text-center flex flex-col items-center justify-center my-2 shadow-sm">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 shadow-sm">
            Coder & Créer
          </span>
          <MorphingText
            texts={morphingTexts}
            morphTime={1.6}
            cooldownTime={0.8}
            className="text-3xl md:text-5xl lg:text-6xl text-foreground font-extrabold min-h-[70px] text-center"
          />
        </div>

        {/* Navigation Links */}
        <div className="py-6 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm font-semibold text-muted-foreground">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="hover:text-foreground transition-colors hover:scale-105 transform duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full glass-panel border border-black/5 dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:scale-110 transition-all shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 font-medium text-center md:text-right">
            <span>© {new Date().getFullYear()} {data.profile.name}. Tous droits réservés.</span>
          </div>

          {/* Accès admin — discret, réservé au propriétaire */}
          <button
            onClick={handleOpenDashboard}
            className="flex items-center gap-1.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-300 text-[10px] font-medium cursor-pointer select-none"
            title="Administration"
            aria-label="Accès administration"
          >
            {isAuthenticated ? (
              <Unlock className="w-3 h-3" />
            ) : (
              <Lock className="w-3 h-3" />
            )}
            <span className="hidden sm:inline">Admin</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
