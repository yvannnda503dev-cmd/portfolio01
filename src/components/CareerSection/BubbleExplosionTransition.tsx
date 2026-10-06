import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── Particule individuelle ─────────────────────────────────────── */
interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i / count) * 360 + Math.random() * 30 - 15,
    distance: 60 + Math.random() * 120,
    size: 4 + Math.random() * 10,
    duration: 0.6 + Math.random() * 0.5,
    delay: Math.random() * 0.15,
    opacity: 0.6 + Math.random() * 0.4,
  }));
}

const PARTICLES = generateParticles(28);

/* ─── Composant principal ─────────────────────────────────────────── */
interface BubbleExplosionTransitionProps {
  children: React.ReactNode;
}

export function BubbleExplosionTransition({
  children,
}: BubbleExplosionTransitionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  const [exploded, setExploded] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [bubbleReady, setBubbleReady] = useState(false);

  /* ── Scroll progress sur le trigger ── */
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end end"],
  });

  /* La bulle descend avec le scroll */
  const bubbleY = useTransform(scrollYProgress, [0, 1], [-40, 20]);
  const bubbleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0]);

  /* Fond violet radial */
  const bgScale = useTransform(scrollYProgress, [0.88, 1], [0, 1]);

  /* ── Déclencher l'explosion ── */
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v >= 0.92 && !exploded) {
        setBubbleReady(true);
      }
      if (v < 0.5) {
        setExploded(false);
        setBubbleReady(false);
      }
    });
    return unsub;
  }, [scrollYProgress, exploded]);

  useEffect(() => {
    if (bubbleReady && !exploded) {
      setExploded(true);
      setShowExplosion(true);
      setTimeout(() => setShowExplosion(false), 1000);
    }
  }, [bubbleReady, exploded]);

  return (
    <div className="relative">
      {/* Zone de déclenchement à la jonction */}
      <div ref={triggerRef} className="relative h-32 -mt-16 pointer-events-none z-20">

        {/* Bulle violette descendante */}
        <motion.div
          style={{ y: bubbleY, opacity: bubbleOpacity }}
          className="absolute left-1/2 -translate-x-1/2 top-0"
        >
          <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-2xl scale-150" />
          <motion.div
            animate={exploded ? { scale: [1, 1.6, 0], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-violet-700 shadow-[0_0_24px_6px_rgba(139,92,246,0.55)] border border-violet-300/40"
          >
            <div className="absolute top-1 left-1.5 w-2 h-1.5 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>

        {/* Particules d'explosion */}
        <AnimatePresence>
          {showExplosion &&
            PARTICLES.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * p.distance;
              const ty = Math.sin(rad) * p.distance;
              return (
                <motion.div
                  key={p.id}
                  className="absolute left-1/2 top-5 rounded-full bg-violet-500"
                  style={{
                    width: p.size,
                    height: p.size,
                    marginLeft: -p.size / 2,
                    marginTop: -p.size / 2,
                    opacity: p.opacity,
                  }}
                  initial={{ x: 0, y: 0, scale: 1, opacity: p.opacity }}
                  animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
                  exit={{}}
                  transition={{ duration: p.duration, delay: p.delay, ease: [0.2, 1, 0.4, 1] }}
                />
              );
            })}
        </AnimatePresence>

        {/* Anneau d'onde (shockwave) */}
        <AnimatePresence>
          {showExplosion && (
            <motion.div
              className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-violet-400/70"
              initial={{ width: 28, height: 28, opacity: 0.9 }}
              animate={{ width: 260, height: 260, opacity: 0 }}
              exit={{}}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Section suivante avec fondu violet progressif, sans ligne dure */}
      <div className="relative overflow-hidden">
        {/* Masque de fondu en haut pour un raccord invisible avec la section précédente */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--background, #09090b) 0%, transparent 100%)",
          }}
        />

        {/* Bloom violet radial qui apparaît avec le scroll — déclenché par l'explosion */}
        <motion.div
          style={{ opacity: bgScale }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 100% 55% at 50% 0%, rgba(139,92,246,0.20) 0%, rgba(109,40,217,0.10) 35%, transparent 70%)",
            }}
          />
        </motion.div>

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
