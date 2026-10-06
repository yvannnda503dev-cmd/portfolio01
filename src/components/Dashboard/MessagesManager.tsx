import React, { useState } from "react";
import { Trash2, Mail, MailOpen, Inbox, X, Reply, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolio, type ContactMessage } from "../../context/PortfolioContext";

export const MessagesManager: React.FC = () => {
  const { data, markMessageRead, deleteMessage } = usePortfolio();
  const messages = data.messages || [];

  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const formatDateShort = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
    });

  const openMessage = (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (!msg.read) markMessageRead(msg.id);
  };

  const closeViewer = () => setSelectedMsg(null);

  // Navigation prev/next dans la visionneuse
  const currentIndex = selectedMsg ? messages.findIndex((m) => m.id === selectedMsg.id) : -1;
  const goPrev = () => currentIndex > 0 && openMessage(messages[currentIndex - 1]);
  const goNext = () => currentIndex < messages.length - 1 && openMessage(messages[currentIndex + 1]);

  const handleDelete = (id: string) => {
    deleteMessage(id);
    if (selectedMsg?.id === id) closeViewer();
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Inbox className="text-primary w-6 h-6" />
            Messages reçus ({messages.length})
            {messages.filter((m) => !m.read).length > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-primary text-primary-foreground">
                {messages.filter((m) => !m.read).length} nouveau{messages.filter((m) => !m.read).length > 1 ? "x" : ""}
              </span>
            )}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cliquez sur un message pour l'ouvrir. Envoyés depuis le formulaire de contact.
          </p>
        </div>
      </div>

      {/* Liste */}
      {messages.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center border border-dashed border-foreground/20">
          <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <h4 className="font-bold text-foreground">Aucun message pour l'instant</h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Les messages envoyés depuis le formulaire de contact apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onClick={() => openMessage(msg)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border cursor-pointer transition-all group hover:border-primary/40 hover:bg-primary/[0.02] ${
                msg.read
                  ? "border-foreground/10 bg-card/40"
                  : "border-primary/25 bg-primary/[0.04] shadow-sm"
              }`}
            >
              {/* Icône */}
              <div className={`shrink-0 p-2 rounded-lg border transition-colors ${
                msg.read
                  ? "bg-foreground/5 border-foreground/10 text-muted-foreground"
                  : "bg-primary/10 border-primary/25 text-primary"
              }`}>
                {msg.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </div>

              {/* Contenu ligne */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm truncate ${msg.read ? "font-semibold text-foreground/80" : "font-extrabold text-foreground"}`}>
                    {msg.name}
                  </span>
                  {!msg.read && (
                    <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-extrabold rounded-full bg-primary text-primary-foreground uppercase tracking-wider">
                      Nouveau
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  <span className="text-primary/80 font-medium">{msg.email}</span>
                  <span className="mx-1.5 opacity-40">·</span>
                  {msg.message}
                </p>
              </div>

              {/* Date + actions */}
              <div className="shrink-0 flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground hidden sm:block">
                  {formatDateShort(msg.receivedAt)}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                  className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Visionneuse ── */}
      <AnimatePresence>
        {selectedMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] flex items-start justify-center pt-16 px-4 pb-6 bg-background/80 backdrop-blur-xl overflow-y-auto"
            onClick={closeViewer}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header visionneuse */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm font-extrabold text-foreground">Message reçu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Navigation */}
                  <button
                    onClick={goPrev}
                    disabled={currentIndex <= 0}
                    className="p-1.5 rounded-lg hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground transition-colors"
                    title="Message précédent"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[11px] text-muted-foreground font-mono px-1">
                    {currentIndex + 1} / {messages.length}
                  </span>
                  <button
                    onClick={goNext}
                    disabled={currentIndex >= messages.length - 1}
                    className="p-1.5 rounded-lg hover:bg-foreground/10 disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground transition-colors"
                    title="Message suivant"
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Fermer */}
                  <button
                    onClick={closeViewer}
                    className="ml-1 p-2 rounded-xl bg-foreground/10 hover:bg-rose-500/20 border border-foreground/15 hover:border-rose-500/40 text-foreground hover:text-rose-400 transition-all"
                    title="Fermer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Méta expéditeur */}
              <div className="px-5 py-4 border-b border-border/60 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-extrabold text-sm shrink-0">
                    {selectedMsg.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-foreground">{selectedMsg.name}</p>
                    <a
                      href={`mailto:${selectedMsg.email}`}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      {selectedMsg.email}
                    </a>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0 text-right">
                    {formatDate(selectedMsg.receivedAt)}
                  </span>
                </div>
              </div>

              {/* Corps du message */}
              <div className="px-5 py-5">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.message}
                </p>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 border-t border-border/60 flex items-center justify-between gap-3 bg-muted/20">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: Votre message&body=%0A%0A----%0AMessage original de ${selectedMsg.name}:%0A${encodeURIComponent(selectedMsg.message)}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-sm"
                >
                  <Reply size={14} />
                  Répondre par email
                </a>
                <button
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-bold transition-all"
                >
                  <Trash2 size={14} />
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
