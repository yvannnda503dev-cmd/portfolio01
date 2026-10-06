import React, { useState } from "react";
import { Plus, Edit2, Trash2, Briefcase, Check, X } from "lucide-react";
import { usePortfolio, type CareerItem } from "../../context/PortfolioContext";
import { DynamicIcon, availableIcons } from "./DynamicIcon";

export const CareerManager: React.FC = () => {
  const { data, addCareer, updateCareer, deleteCareer } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCareer, setEditingCareer] = useState<CareerItem | null>(null);

  const [formData, setFormData] = useState({
    year: "",
    title: "",
    subtitle: "",
    description: "",
    iconName: "Rocket",
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingCareer(null);
    setFormData({
      year: new Date().getFullYear().toString(),
      title: "",
      subtitle: "",
      description: "",
      iconName: "Rocket",
    });
    setIsFormOpen(true);
  };

  const openEditModal = (item: CareerItem) => {
    setEditingCareer(item);
    setFormData({
      year: item.year,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      iconName: item.iconName || "Rocket",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCareer) {
      updateCareer(editingCareer.id, formData);
    } else {
      addCareer(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Briefcase className="text-primary w-6 h-6" />
            Parcours & Chronologie ({data.career.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez les étapes clés de votre parcours et expériences professionnelles.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>Ajouter une Étape</span>
        </button>
      </div>

      {/* Career Timeline List */}
      <div className="space-y-3">
        {data.career.map((item, idx) => (
          <div
            key={item.id}
            className="glass-panel p-4 sm:p-5 rounded-2xl border border-foreground/10 flex items-start justify-between gap-4 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <DynamicIcon name={item.iconName || "Rocket"} size={18} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-primary/15 text-primary">
                    {item.year}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">
                    #{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                <p className="text-xs font-medium text-primary/80">{item.subtitle}</p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                title="Modifier"
              >
                <Edit2 size={15} />
              </button>
              {deleteConfirmId === item.id ? (
                <div className="flex items-center gap-1 bg-rose-500/20 p-1 rounded-lg border border-rose-500/30">
                  <button
                    onClick={() => {
                      deleteCareer(item.id);
                      setDeleteConfirmId(null);
                    }}
                    className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold hover:bg-rose-700"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 px-4 pb-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-[2rem] border border-primary/30 shadow-2xl relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-foreground/10 hover:bg-rose-500/20 border border-foreground/15 hover:border-rose-500/40 text-foreground hover:text-rose-400 transition-all shadow-sm"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-extrabold text-foreground mb-1">
              {editingCareer ? "Modifier l'Étape" : "Nouvelle Étape"}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Renseignez les informations de cette période.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Période / Année *</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Ex: 2025 – Présent"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Icône</label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  >
                    {availableIcons.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Titre de l'étape *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Développeur Web Freelance"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Sous-titre / Contexte</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Ex: Projets personnels & clients"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Détails sur les missions réalisées, les outils utilisés et les résultats..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-sm"
                >
                  <Check size={14} />
                  <span>Enregistrer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
