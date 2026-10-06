import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FolderKanban, GraduationCap, Send } from "lucide-react";
import { useLenis } from "lenis/react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  href: string;
}

const navItems: NavItem[] = [
  { id: "hero",      label: "Accueil", icon: Home,          href: "#hero" },
  { id: "about",     label: "Profil",  icon: User,          href: "#about" },
  { id: "projects",  label: "Projets", icon: FolderKanban,  href: "#projects" },
  { id: "education", label: "Compétences", icon: GraduationCap, href: "#education" },
  { id: "contact",   label: "Contact", icon: Send,          href: "#contact" },
];

export const MobileBottomNav = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lockedSection, setLockedSection] = useState<string | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      if (lockedSection) return;

      // getBoundingClientRect() = position réelle dans le viewport, toujours fiable
      let current = "hero";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // La section est "active" dès que son haut dépasse 40% du viewport
        if (rect.top <= window.innerHeight * 0.4) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Delay initial pour laisser le DOM se rendre
    const init = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(init);
    };
  }, [lockedSection]);

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setLockedSection(id);

    if (lenis) {
      lenis.scrollTo(href, { offset: -20, duration: 1.1 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }

    const timer = setTimeout(() => setLockedSection(null), 1800);
    return () => clearTimeout(timer);
  };

  return (
    /* Wrapper flottant — marges sur tous les côtés */
    <div
      className="fixed z-[90] md:hidden"
      style={{
        bottom: `calc(env(safe-area-inset-bottom, 0px) + 14px)`,
        left: "12px",
        right: "12px",
      }}
    >
      <motion.nav
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Navigation mobile"
        className="
          flex items-center justify-around
          rounded-3xl
          bg-background/85 dark:bg-card/90
          backdrop-blur-2xl
          border border-foreground/[0.08] dark:border-white/[0.1]
          shadow-[0_8px_32px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.08)]
          dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          px-1 h-[58px]
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id, item.href)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex flex-col items-center justify-center gap-[3px] flex-1 h-full py-2 cursor-pointer select-none group"
            >
              {/* ── Indicateur ::after — barre en haut, centrée, bien positionnée ── */}
              <span
                className="absolute top-0 left-1/2"
                style={{
                  transform: "translateX(-50%)",
                  width: isActive ? "28px" : "0px",
                  height: "2.5px",
                  borderRadius: "0 0 4px 4px",
                  backgroundColor: "var(--color-primary)",
                  transition: "width 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  opacity: isActive ? 1 : 0,
                }}
              />

              {/* Icône */}
              <motion.span
                animate={{
                  y: isActive ? -1 : 0,
                  scale: isActive ? 1.12 : 1,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className={`flex items-center justify-center transition-colors duration-150 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-active:text-foreground"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.3 : 1.7} />
              </motion.span>

              {/* Label */}
              <span
                className={`text-[9px] leading-none tracking-tight transition-all duration-150 truncate max-w-[52px] text-center ${
                  isActive
                    ? "text-foreground font-bold"
                    : "text-muted-foreground/60 font-medium"
                }`}
              >
                {item.label}
              </span>

              {/* Ripple au tap */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="ripple"
                    className="absolute inset-0 rounded-xl bg-primary/[0.07] pointer-events-none"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default MobileBottomNav;
