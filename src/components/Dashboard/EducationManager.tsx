import React, { useState } from "react";
import { Plus, Edit2, Trash2, GraduationCap, Check, X } from "lucide-react";
import { usePortfolio, type EducationItem } from "../../context/PortfolioContext";
import { DynamicIcon, availableIcons } from "./DynamicIcon";

export const EducationManager: React.FC = () => {
  const { data, addEducation, updateEducation, deleteEducation } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);

  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    year: "",
    badge: "En cours",
    badgeColor: "text-primary bg-primary/10 border-primary/30",
    iconName: "GraduationCap",
    details: "",
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingEdu(null);
    setFormData({
      degree: "",
      school: "Abidjan, Côte d'Ivoire",
      year: "2024 – Présent",
      badge: "En progression",
      badgeColor: "text-primary bg-primary/10 border-primary/30",
      iconName: "GraduationCap",
      details: "Apprentissage continu\nProjets pratiques\nVeille technologique",
    });
    setIsFormOpen(true);
  };

  const openEditModal = (item: EducationItem) => {
    setEditingEdu(item);
    setFormData({
      degree: item.degree,
      school: item.school,
      year: item.year,
      badge: item.badge,
      badgeColor: item.badgeColor,
      iconName: item.iconName || "GraduationCap",
      details: item.details.join("\n"),
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const detailsArray = formData.details
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    const payload = {
      degree: formData.degree,
      school: formData.school,
      year: formData.year,
      badge: formData.badge,
      badgeColor: formData.badgeColor,
      iconName: formData.iconName,
      details: detailsArray,
    };

    if (editingEdu) {
      updateEducation(editingEdu.id, payload);
    } else {
      addEducation(payload);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <GraduationCap className="text-primary w-6 h-6" />
            Formations & Diplômes ({data.education.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez vos diplômes, formations certifiantes ou parcours d'auto-formation.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>Ajouter une Formation</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.education.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-5 rounded-2xl border border-foreground/10 flex flex-col justify-between hover:border-primary/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                    <DynamicIcon name={item.iconName || "GraduationCap"} size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{item.degree}</h4>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {item.school} · <span className="text-primary font-mono font-bold">{item.year}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                  >
                    <Edit2 size={15} />
                  </button>
                  {deleteConfirmId === item.id ? (
                    <div className="flex items-center gap-1 bg-rose-500/20 p-1 rounded-lg border border-rose-500/30">
                      <button
                        onClick={() => {
                          deleteEducation(item.id);
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
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-extrabold ${item.badgeColor}`}>
                  {item.badge}
                </span>
              </div>

              <ul className="space-y-1.5 pt-2 border-t border-foreground/10">
                {item.details.map((det, i) => (
                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5 font-bold">•</span>
                    <span>{det}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

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
              {editingEdu ? "Modifier la Formation" : "Nouvelle Formation"}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Remplissez les informations relatives à la formation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Diplôme / Titre de la formation *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Ex: Formation Full-Stack & React"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Établissement / Lieu *</label>
                  <input
                    type="text"
                    required
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="Ex: Auto-formation & Pratique"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Année / Période *</label>
                  <input
                    type="text"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="Ex: 2023 – Présent"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Badge / Statut</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ex: En progression / Diplômé"
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
                <label className="block font-bold text-foreground mb-1">
                  Points clés / Détails (1 par ligne) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Apprentissage du développement web&#10;Maîtrise de React et Node.js&#10;Projets réels"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none resize-none font-mono text-[11px]"
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
