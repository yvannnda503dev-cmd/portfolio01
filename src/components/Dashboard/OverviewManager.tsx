import React, { useState } from "react";
import {
  FolderKanban,
  Briefcase,
  GraduationCap,
  Layers,
  Sparkles,
  MessageSquareQuote,
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

interface OverviewManagerProps {
  onNavigateTab: (tab: string) => void;
}

export const OverviewManager: React.FC<OverviewManagerProps> = ({ onNavigateTab }) => {
  const { data, resetToDefaults, exportDataJSON, importDataJSON } = usePortfolio();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("idle");
  const [copiedExport, setCopiedExport] = useState(false);

  const statsCards = [
    {
      id: "projects",
      title: "Projets",
      count: data.projects.length,
      icon: FolderKanban,
      color: "from-purple-500 to-indigo-600",
      description: "Gérer vos réalisations et études de cas",
    },
    {
      id: "career",
      title: "Parcours & Événements",
      count: data.career.length,
      icon: Briefcase,
      color: "from-sky-500 to-blue-600",
      description: "Chronologie de vos expériences professionnelles",
    },
    {
      id: "education",
      title: "Formations & Diplômes",
      count: data.education.length,
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      description: "Diplômes, certifications et auto-formation",
    },
    {
      id: "skills",
      title: "Compétences",
      count: data.techSkills.length + data.softSkills.length,
      icon: Layers,
      color: "from-amber-500 to-orange-600",
      description: `${data.techSkills.length} techniques · ${data.softSkills.length} soft skills`,
    },
    {
      id: "services",
      title: "Services",
      count: data.services.length,
      icon: Sparkles,
      color: "from-pink-500 to-rose-600",
      description: "Offres et prestations de développement",
    },
    {
      id: "testimonials",
      title: "Témoignages",
      count: data.testimonials.length,
      icon: MessageSquareQuote,
      color: "from-violet-500 to-purple-600",
      description: "Avis et retours de clients et collaborateurs",
    },
  ];

  const handleExport = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importDataJSON(content);
        if (success) {
          setImportStatus("success");
          setTimeout(() => setImportStatus("idle"), 3000);
        } else {
          setImportStatus("error");
          setTimeout(() => setImportStatus("idle"), 3000);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 md:p-8 rounded-[2rem] bg-gradient-to-r from-purple-900/30 via-primary/20 to-sky-900/20 border border-primary/25 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/30">
            <Sparkles size={14} />
            <span>Tableau de bord d'administration</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
            Bienvenue, {data.profile.name.split(" ")[0]} !
          </h2>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            D'ici, vous avez le contrôle total sur l'ensemble des éléments affichés sur votre
            portfolio. Chaque modification effectuée est automatiquement synchronisée et visible en temps réel.
          </p>
        </div>
      </div>

      {/* Grid of Sections */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Gestion des Contenus</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigateTab(card.id)}
                className="glass-panel p-5 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={22} />
                  </div>
                  <span className="font-extrabold text-2xl text-foreground group-hover:text-primary transition-colors">
                    {card.count}
                  </span>
                </div>
                <h4 className="font-bold text-foreground text-base group-hover:text-primary flex items-center justify-between">
                  <span>{card.title}</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </h4>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Profile Summary */}
      <div className="glass-panel p-6 rounded-2xl border border-foreground/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-foreground/10">
          <div>
            <h3 className="text-base font-bold text-foreground">Identité & Coordonnées</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Aperçu des informations principales affichées sur le portfolio</p>
          </div>
          <button
            onClick={() => onNavigateTab("profile")}
            className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold border border-primary/30 transition-all"
          >
            Modifier le Profil
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-foreground/5">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">Nom complet</span>
            <span className="text-xs font-bold text-foreground truncate block mt-0.5">{data.profile.name}</span>
          </div>
          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-foreground/5">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">Rôle / Titre</span>
            <span className="text-xs font-bold text-foreground truncate block mt-0.5">{data.profile.role}</span>
          </div>
          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-foreground/5">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">Email</span>
            <span className="text-xs font-bold text-foreground truncate block mt-0.5">{data.profile.email}</span>
          </div>
          <div className="p-3 rounded-xl bg-foreground/[0.03] border border-foreground/5">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">Statut</span>
            <span className="text-xs font-bold text-emerald-400 truncate block mt-0.5">● {data.profile.statusText}</span>
          </div>
        </div>
      </div>

      {/* Backup, Import & Reset */}
      <div className="glass-panel p-6 rounded-2xl border border-foreground/10">
        <h3 className="text-base font-bold text-foreground mb-1">Sauvegarde & Restauration</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Exportez vos données sous forme de fichier JSON ou importez une configuration existante.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/15 text-xs font-bold text-foreground transition-all cursor-pointer"
          >
            {copiedExport ? <Check size={14} className="text-emerald-400" /> : <Download size={14} />}
            <span>{copiedExport ? "Téléchargé !" : "Exporter les données (JSON)"}</span>
          </button>

          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/15 text-xs font-bold text-foreground transition-all cursor-pointer">
            <Upload size={14} />
            <span>Importer des données (JSON)</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          {importStatus === "success" && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
              <Check size={14} /> Données importées avec succès !
            </span>
          )}
          {importStatus === "error" && (
            <span className="text-xs text-rose-400 font-bold flex items-center gap-1.5">
              <AlertTriangle size={14} /> Format JSON invalide.
            </span>
          )}

          <div className="ml-auto">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Réinitialiser par défaut</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-400 font-bold">Confirmer ?</span>
                <button
                  onClick={() => {
                    resetToDefaults();
                    setShowResetConfirm(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold shadow-md hover:bg-rose-700"
                >
                  Oui, réinitialiser
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1.5 rounded-lg bg-foreground/10 text-foreground text-xs font-bold hover:bg-foreground/20"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
