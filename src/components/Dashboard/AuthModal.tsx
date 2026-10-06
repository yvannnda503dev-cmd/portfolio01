import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Eye, EyeOff, X, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setIsAuthenticated, setIsDashboardOpen } =
    usePortfolio();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
        setIsDashboardOpen(true);
        setIsSuccess(false);
        setPassword("");
      }, 700);
    } else {
      setError(true);
      setErrorMessage("Mot de passe incorrect. Veuillez réessayer.");
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setPassword("");
    setError(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
        {/* Backdrop Glow */}
        <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md glass-panel p-8 rounded-[2.5rem] border border-primary/30 shadow-[0_20px_60px_rgba(139,92,246,0.25)] overflow-hidden"
        >
          {/* Subtle top decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-primary to-sky-400" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-panel border border-foreground/10 text-muted-foreground hover:text-foreground hover:scale-110 transition-all"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mt-2 mb-6">
            <motion.div
              animate={
                error
                  ? { x: [-10, 10, -10, 10, 0] }
                  : isSuccess
                  ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                isSuccess
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                  : error
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.4)]"
                  : "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              }`}
            >
              {isSuccess ? (
                <Unlock className="w-8 h-8" />
              ) : (
                <Lock className="w-8 h-8" />
              )}
            </motion.div>

            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
              {isSuccess ? "Accès Autorisé" : "Espace Administrateur"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
              {isSuccess
                ? "Connexion au tableau de bord en cours..."
                : "Entrez votre mot de passe pour modifier et gérer le contenu du portfolio."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                autoFocus
                disabled={isSuccess}
                className={`w-full px-4 py-3.5 pr-12 rounded-2xl bg-foreground/5 border text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all ${
                  error
                    ? "border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-foreground/15 focus:border-primary focus:ring-2 focus:ring-primary/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-rose-400 text-xs font-semibold px-2"
              >
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSuccess || !password}
              className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer mt-2 shadow-sm"
            >
              {isSuccess ? (
                <>
                  <ShieldCheck size={18} />
                  <span>Accès déverrouillé...</span>
                </>
              ) : (
                <>
                  <span>Déverrouiller le Dashboard</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-4 border-t border-foreground/10 text-center">
            <span className="text-[11px] font-medium text-muted-foreground flex items-center justify-center gap-1.5">
              <ShieldCheck size={13} className="text-primary" />
              Accès réservé au propriétaire du portfolio
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
