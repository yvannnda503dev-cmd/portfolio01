import React, { useState } from "react";
import { User, Check, Sparkles, Mail, Phone, MapPin, Github, Save } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export const ProfileManager: React.FC = () => {
  const { data, updateProfile, updateStat } = usePortfolio();

  const [profileForm, setProfileForm] = useState({ ...data.profile });
  const [statsForm, setStatsForm] = useState(
    data.stats.map((s) => ({ id: s.id, label: s.label, value: s.value }))
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    statsForm.forEach((stat) => {
      updateStat(stat.id, { label: stat.label, value: stat.value });
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleStatChange = (id: string, field: "label" | "value", val: string) => {
    setStatsForm((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <User className="text-primary w-6 h-6" />
            Profil & Informations Générales
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Modifiez vos informations personnelles, coordonnées, textes de présentation et statistiques.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          {isSaved ? <Check size={16} className="text-emerald-300" /> : <Save size={16} />}
          <span>{isSaved ? "Modifications Enregistrées !" : "Enregistrer les modifications"}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Identité & Badge */}
        <div className="glass-panel p-6 rounded-2xl border border-foreground/10 space-y-4">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-foreground/10 pb-3">
            <Sparkles size={16} className="text-primary" /> Identité Visuelle & Badge 3D
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-foreground mb-1">Nom complet *</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Titre / Rôle principal *</label>
              <input
                type="text"
                required
                value={profileForm.role}
                onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Identifiant Badge ID</label>
              <input
                type="text"
                value={profileForm.badgeId}
                onChange={(e) => setProfileForm({ ...profileForm, badgeId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Statut de disponibilité</label>
              <input
                type="text"
                value={profileForm.statusText}
                onChange={(e) => setProfileForm({ ...profileForm, statusText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none text-emerald-400 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Spécialité (Badge)</label>
              <input
                type="text"
                value={profileForm.specialty}
                onChange={(e) => setProfileForm({ ...profileForm, specialty: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Localisation</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Coordonnées & Réseaux */}
        <div className="glass-panel p-6 rounded-2xl border border-foreground/10 space-y-4">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-foreground/10 pb-3">
            <Mail size={16} className="text-primary" /> Coordonnées & Liens
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-foreground mb-1 flex items-center gap-1.5">
                <Mail size={13} className="text-primary" /> Email de contact
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1 flex items-center gap-1.5">
                <Phone size={13} className="text-primary" /> Téléphone
              </label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1 flex items-center gap-1.5">
                <Github size={13} className="text-primary" /> URL Profil GitHub
              </label>
              <input
                type="url"
                value={profileForm.github}
                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Textes de présentation */}
        <div className="glass-panel p-6 rounded-2xl border border-foreground/10 space-y-4">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-foreground/10 pb-3">
            <MapPin size={16} className="text-primary" /> Textes & Paragraphes de Présentation
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-foreground mb-1">Bio Section Hero (Accueil)</label>
              <textarea
                rows={2}
                value={profileForm.heroBio}
                onChange={(e) => setProfileForm({ ...profileForm, heroBio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Section À Propos — Paragraphe 1</label>
              <textarea
                rows={2}
                value={profileForm.aboutText1}
                onChange={(e) => setProfileForm({ ...profileForm, aboutText1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-foreground mb-1">Section À Propos — Paragraphe 2</label>
              <textarea
                rows={2}
                value={profileForm.aboutText2}
                onChange={(e) => setProfileForm({ ...profileForm, aboutText2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Chiffres & Stats */}
        <div className="glass-panel p-6 rounded-2xl border border-foreground/10 space-y-4">
          <h4 className="text-sm font-bold text-foreground flex items-center gap-2 border-b border-foreground/10 pb-3">
            <Sparkles size={16} className="text-primary" /> Chiffres & Statistiques Clés
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsForm.map((stat) => (
              <div key={stat.id} className="p-3.5 rounded-xl bg-foreground/[0.03] border border-foreground/10 space-y-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                    Libellé
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(stat.id, "label", e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-foreground/5 border border-foreground/15 text-foreground text-xs font-semibold focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-muted-foreground mb-1">
                    Valeur
                  </label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(stat.id, "value", e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-foreground/5 border border-foreground/15 text-foreground text-xs font-bold font-mono focus:border-primary focus:outline-none text-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            {isSaved ? <Check size={16} /> : <Save size={16} />}
            <span>{isSaved ? "Modifications Enregistrées !" : "Enregistrer toutes les modifications"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
