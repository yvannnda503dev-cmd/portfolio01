import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { ThemeToggle } from "../lightswind/theme-toggle";
import { usePortfolio } from "../../context/PortfolioContext";

const navItems = [
  { name: "Accueil", href: "#hero" },
  { name: "À propos", href: "#about" },
  { name: "Parcours", href: "#career" },
  { name: "Projets", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const lenis = useLenis();
  const { data } = usePortfolio();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (lenis) lenis.scrollTo(id);
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-3 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4"
        >
          <div className="glass-panel w-full max-w-7xl rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3.5 shadow-xl transition-all">

            {/* Logo & Brand */}
            <a
              onClick={() => handleScrollTo("#hero")}
              className="cursor-pointer flex items-center gap-2.5 sm:gap-3 group select-none"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0 border border-primary/20">
                <img src="/NDADEV_logo.png" alt="NDADEV Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-foreground text-xs sm:text-sm leading-none group-hover:text-primary transition-colors">
                  {data.profile.name}
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                  {data.profile.role}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-7 lg:space-x-8">
                {navItems.map((item) => (
                  <motion.li key={item.name} className="relative group text-sm font-medium text-muted-foreground transition-colors">
                    <a onClick={() => handleScrollTo(item.href)} className="cursor-pointer hover:text-foreground">
                      {item.name}
                    </a>
                    <motion.span
                      className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-primary/70 rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>

          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
