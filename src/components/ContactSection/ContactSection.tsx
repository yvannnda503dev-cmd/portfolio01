import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { usePortfolio } from "../../context/PortfolioContext";

// ── EmailJS config ────────────────────────────────────────────────────────────
// Configure tes identifiants dans le fichier .env à la racine du projet :
//   VITE_EMAILJS_SERVICE_ID=service_abc123
//   VITE_EMAILJS_TEMPLATE_ID=template_xyz789
//   VITE_EMAILJS_PUBLIC_KEY=aBcDeFgHiJkLmNoP
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

export const ContactSection = () => {
  const { data } = usePortfolio();
  const { profile } = data;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [flyPlane, setFlyPlane] = useState(false);

  // Barre de progression progressive pendant l'envoi
  useEffect(() => {
    if (!loading) return;
    setProgress(0);
    const steps = [
      { target: 30, delay: 0 },
      { target: 65, delay: 200 },
      { target: 85, delay: 450 },
      { target: 100, delay: 700 },
    ];
    const timers = steps.map(({ target, delay }) =>
      setTimeout(() => setProgress(target), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Envoi via API EmailJS (sans package npm)
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:  form.name,
            from_email: form.email,
            message:    form.message,
            to_email:   profile.email,
          },
        }),
      });

      if (!response.ok) throw new Error("EmailJS error");

      setFlyPlane(true);
      setTimeout(() => {
        setLoading(false);
        setFlyPlane(false);
        setSent(true);
        setProgress(0);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      }, 700);

    } catch {
      setLoading(false);
      alert("Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement par email.");
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-5 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] border border-foreground/10 relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-10 md:gap-24">

          {/* Contact Info */}
          <div className="flex-1 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
                Travaillons <span className="text-gradient-primary">ensemble</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg">
                Disponible pour des projets freelance, des collaborations ou simplement pour échanger.
                N'hésitez pas à me contacter, je réponds rapidement.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <a href={`mailto:${profile.email}`}
                className="flex items-center gap-3.5 sm:gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group text-sm sm:text-base break-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-medium">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3.5 sm:gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group text-sm sm:text-base">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-medium">{profile.phone}</span>
              </a>
              <div className="flex items-center gap-3.5 sm:gap-4 text-muted-foreground text-sm sm:text-base">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-medium">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 glass-panel p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-foreground/10 relative">
            <AnimatePresence mode="wait">
              {sent ? (
                /* ── Confirmation ── */
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </motion.div>
                  <h3 className="text-xl font-extrabold text-foreground">Message envoyé !</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Votre message a bien été reçu. Je vous répondrai dans les plus brefs délais.
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Votre nom</label>
                    <Input
                      name="name" type="text" required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      disabled={loading}
                      className="rounded-xl py-3 px-4 bg-background border-foreground/20 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/40 disabled:opacity-60"
                      placeholder="•••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Votre email</label>
                    <Input
                      name="email" type="email" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      disabled={loading}
                      className="rounded-xl py-3 px-4 bg-background border-foreground/20 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/40 disabled:opacity-60"
                      placeholder="•••••••••••@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                    <Textarea
                      name="message" rows={4} required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      disabled={loading}
                      className="rounded-xl py-3 px-4 bg-background border-foreground/20 text-foreground focus-visible:ring-primary resize-none placeholder:text-muted-foreground/40 min-h-[120px] disabled:opacity-60"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  {/* ── Bouton avec barre de progression ── */}
                  <div className="relative mt-4 h-12 rounded-xl overflow-hidden">

                    {/* Fond fixe violet */}
                    <div className="absolute inset-0" style={{ backgroundColor: "#8b5cf6" }} />

                    {/* Le background remplit de gauche à droite par-dessus le violet */}
                    {loading && (
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-background"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}

                    {/* Texte — couleur s'adapte au fond sous lui */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 font-bold text-sm cursor-pointer disabled:cursor-default select-none"
                      style={{ color: loading && progress > 30 ? "var(--color-foreground)" : "#ffffff" }}
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span
                            key="sending"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.span
                              animate={flyPlane ? {
                                x: [0, 80],
                                y: [0, -40],
                                opacity: [1, 0],
                                rotate: [-30, -60],
                              } : {
                                x: [0, 4, -4, 0],
                                y: [0, -3, 0],
                                rotate: [-15, -15],
                              }}
                              transition={flyPlane ? {
                                duration: 0.6,
                                ease: "easeIn",
                              } : {
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <Send className="w-4 h-4 -rotate-45" />
                            </motion.span>
                            <span>Envoi en cours...</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Send className="w-4 h-4" />
                            <span>Envoyer le message</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
