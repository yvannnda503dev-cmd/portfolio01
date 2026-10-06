import { motion } from "framer-motion";
import { ArrowRight, Github, Mail } from "lucide-react";
import TechStackSection from "../TechStackSection/TechStackSection";
import { Button } from "../lightswind/button";
import { Badge } from "../lightswind/badge";
import { HangingIdCard } from "../lightswind/HangingIdCard";
import { AuroraTextEffect } from "../lightswind/aurora-text-effect";
import { DotPattern } from "../lightswind/dot-pattern";
import { usePortfolio } from "../../context/PortfolioContext";

export const HeroSection = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col pt-20 sm:pt-24 md:pt-28 overflow-hidden bg-background">
      {/* Background Dot Pattern with Radial Vignette Shade */}
      <DotPattern width={16} height={16} cx={1} cy={1} cr={1} glow />
      
      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 pb-12">
        
        {/* Left Content */}
        <motion.div 
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-0 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 sm:mb-6"
          >
            <Badge variant="outline" size="lg" className="gap-2.5 py-1.5 px-4 glass-panel border-foreground/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-muted-foreground">{profile.statusText}</span>
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-4 text-center md:text-left w-full"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-2">
              Salut, je suis
            </h1>
            
            {/* Light Theme */}
            <div className="block dark:hidden">
              <span className="bg-gradient-to-r from-violet-600 via-sky-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-extrabold text-[clamp(1.75rem,7vw,3.5rem)] leading-tight tracking-tight block pb-1 select-none">
                {profile.name}
              </span>
            </div>

            {/* Dark Theme */}
            <div className="hidden dark:block">
              <AuroraTextEffect
                text={profile.name}
                fontSize="clamp(1.75rem, 7vw, 3.5rem)"
                className="bg-transparent overflow-visible p-0 justify-center md:justify-start"
                textClassName="bg-gradient-to-r from-cyan-400 via-purple-400 to-sky-300 bg-clip-text text-transparent pb-1 font-extrabold"
              />
            </div>
          </motion.div>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {profile.heroBio}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full px-7 h-12 bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Voir mes projets <ArrowRight className="w-4 h-4" />
            </Button>
            <a href={`mailto:${profile.email}`} className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-7 h-12 glass-panel text-foreground font-semibold flex items-center justify-center gap-2 hover:bg-foreground/10 transition-all hover:-translate-y-0.5 border-foreground/15 shadow-sm cursor-pointer">
                Me contacter <Mail className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex items-center gap-5 justify-center md:justify-start w-full md:w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a
              href={profile.github || "https://github.com/yvannnda503dev-cmd"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass-panel border border-foreground/10 text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-full glass-panel border border-foreground/10 text-muted-foreground hover:text-foreground transition-colors hover:-translate-y-1 transform duration-200"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Content - Visual Hanging ID Card */}
        <motion.div 
          className="flex w-full max-w-[260px] sm:max-w-sm md:max-w-md relative justify-center items-center py-2 mx-auto"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HangingIdCard
            name={profile.name}
            role={profile.role}
            badgeId={profile.badgeId}
            accentColor="#8b5cf6"
            ropeLength={40}
            ropeColor="#27272a"
            cardWidth="w-[220px] sm:w-[270px] md:w-[300px]"
          >
            <div className="flex flex-col h-full bg-card w-full">
              {/* Card Header Banner */}
              <div className="relative px-4 pt-5 pb-4 flex flex-col items-center bg-gradient-to-br from-purple-700 via-primary to-indigo-950 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />
                <div className="mt-1 relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-primary to-purple-400 shadow-2xl border border-white/50 flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/NDADEV_logo.png"
                      alt="N'da Koffi Dariel Yvann"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-4 flex flex-col items-center text-center bg-card text-card-foreground flex-1 gap-2">
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-foreground leading-tight">{profile.name}</h3>
                  <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[9px] sm:text-[10px] font-semibold">
                    <span>{profile.role}</span>
                  </div>
                </div>

                <div className="w-full border-t border-border/60" />

                {/* Details 2x2 Grid */}
                <div className="grid grid-cols-2 gap-1.5 w-full text-left bg-muted/40 p-2 rounded-xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block text-[7px] uppercase tracking-widest font-bold">Spécialité</span>
                    <span className="font-bold text-foreground text-[9px] sm:text-[10px]">{profile.specialty}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[7px] uppercase tracking-widest font-bold">Localisation</span>
                    <span className="font-bold text-foreground text-[9px] sm:text-[10px]">{profile.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[7px] uppercase tracking-widest font-bold">Stack</span>
                    <span className="font-bold text-foreground text-[9px] sm:text-[10px]">Full-Stack</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[7px] uppercase tracking-widest font-bold">Statut</span>
                    <span className="font-bold text-emerald-500 text-[9px] sm:text-[10px] flex items-center gap-1">● {profile.statusText}</span>
                  </div>
                </div>

                {/* Barcode */}
                <div className="flex flex-col items-center w-full gap-0.5">
                  <div className="flex gap-[2px] items-end h-5 px-2 py-0.5 bg-white/90 dark:bg-black/40 rounded-md border border-border/40 w-full justify-center">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-foreground rounded-[1px]"
                        style={{
                          width: i % 4 === 0 ? "2.5px" : i % 2 === 0 ? "1.5px" : "1px",
                          height: `${50 + Math.sin(i * 1.4) * 45}%`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between w-full px-0.5 text-[8px]">
                    <span className="font-mono font-bold tracking-widest text-primary">{profile.badgeId}</span>
                    <span className="text-muted-foreground font-semibold text-[7px] uppercase tracking-wider">PORTFOLIO</span>
                  </div>
                </div>
              </div>
            </div>
          </HangingIdCard>
        </motion.div>

      </div>

      {/* Marquee appended natively to the bottom to span Full Width */}
      <div className="w-full relative z-10 mt-auto">
        <TechStackSection />
      </div>
    </section>
  );
};
