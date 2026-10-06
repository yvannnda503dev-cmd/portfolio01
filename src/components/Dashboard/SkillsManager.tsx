import React, { useState } from "react";
import { Plus, Edit2, Trash2, Layers, Brain, X } from "lucide-react";
import {
  usePortfolio,
  type TechSkillItem,
  type SoftSkillItem,
} from "../../context/PortfolioContext";
import { DynamicIcon, availableIcons } from "./DynamicIcon";

export const SkillsManager: React.FC = () => {
  const {
    data,
    addTechSkill,
    updateTechSkill,
    deleteTechSkill,
    addSoftSkill,
    updateSoftSkill,
    deleteSoftSkill,
  } = usePortfolio();

  // Tech Skill State
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<TechSkillItem | null>(null);
  const [techForm, setTechForm] = useState({
    name: "",
    level: 80,
    iconName: "Code2",
    color: "text-cyan-400",
  });

  // Soft Skill State
  const [isSoftModalOpen, setIsSoftModalOpen] = useState(false);
  const [editingSoft, setEditingSoft] = useState<SoftSkillItem | null>(null);
  const [softForm, setSoftForm] = useState({
    name: "",
    iconName: "Brain",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Handlers Tech
  const openAddTech = () => {
    setEditingTech(null);
    setTechForm({
      name: "",
      level: 80,
      iconName: "Code2",
      color: "text-cyan-400",
    });
    setIsTechModalOpen(true);
  };

  const openEditTech = (skill: TechSkillItem) => {
    setEditingTech(skill);
    setTechForm({
      name: skill.name,
      level: skill.level,
      iconName: skill.iconName,
      color: skill.color,
    });
    setIsTechModalOpen(true);
  };

  const handleTechSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTech) {
      updateTechSkill(editingTech.id, techForm);
    } else {
      addTechSkill(techForm);
    }
    setIsTechModalOpen(false);
  };

  // Handlers Soft
  const openAddSoft = () => {
    setEditingSoft(null);
    setSoftForm({
      name: "",
      iconName: "Brain",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    });
    setIsSoftModalOpen(true);
  };

  const openEditSoft = (skill: SoftSkillItem) => {
    setEditingSoft(skill);
    setSoftForm({
      name: skill.name,
      iconName: skill.iconName,
      color: skill.color,
    });
    setIsSoftModalOpen(true);
  };

  const handleSoftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSoft) {
      updateSoftSkill(editingSoft.id, softForm);
    } else {
      addSoftSkill(softForm);
    }
    setIsSoftModalOpen(false);
  };

  const colorPresets = [
    { label: "Violet / Cyan", class: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    { label: "Jaune / Ambre", class: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
    { label: "Bleu Ciel", class: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
    { label: "Émeraude", class: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { label: "Rose", class: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    { label: "Orange", class: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Technical Skills Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Layers className="text-primary w-6 h-6" />
              Stack Technique ({data.techSkills.length})
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Langages, frameworks et outils avec pourcentages de maîtrise.
            </p>
          </div>

          <button
            onClick={openAddTech}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
          >
            <Plus size={15} />
            <span>Ajouter une compétence</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.techSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-panel p-4 rounded-xl border border-foreground/10 flex items-center justify-between gap-3 hover:border-primary/40 transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-primary shrink-0">
                  <DynamicIcon name={skill.iconName || "Code2"} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-foreground truncate">{skill.name}</span>
                    <span className="font-mono text-xs font-bold text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={() => openEditTech(skill)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <Edit2 size={14} />
                </button>
                {deleteConfirmId === skill.id ? (
                  <button
                    onClick={() => {
                      deleteTechSkill(skill.id);
                      setDeleteConfirmId(null);
                    }}
                    className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
                  >
                    Supprimer
                  </button>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(skill.id)}
                    className="p-1 rounded-lg text-muted-foreground hover:text-rose-400"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills Section */}
      <div className="space-y-4 pt-4 border-t border-foreground/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
              <Brain className="text-primary w-6 h-6" />
              Soft Skills & Qualités ({data.softSkills.length})
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Badges comportementaux et méthodologies de travail.
            </p>
          </div>

          <button
            onClick={openAddSoft}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
          >
            <Plus size={15} />
            <span>Ajouter un soft skill</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {data.softSkills.map((skill) => (
            <div
              key={skill.id}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-sm ${skill.color}`}
            >
              <DynamicIcon name={skill.iconName || "Brain"} size={14} />
              <span>{skill.name}</span>
              <button
                onClick={() => openEditSoft(skill)}
                className="opacity-60 hover:opacity-100 hover:text-foreground ml-1"
                title="Modifier"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => deleteSoftSkill(skill.id)}
                className="opacity-60 hover:opacity-100 hover:text-rose-400"
                title="Supprimer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Skill Modal */}
      {isTechModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 px-4 pb-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-md glass-panel p-6 rounded-[2rem] border border-primary/30 shadow-2xl relative">
            <button
              onClick={() => setIsTechModalOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-foreground/10 hover:bg-rose-500/20 border border-foreground/15 hover:border-rose-500/40 text-foreground hover:text-rose-400 transition-all shadow-sm"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-extrabold text-foreground mb-1">
              {editingTech ? "Modifier la Compétence" : "Nouvelle Compétence Technique"}
            </h3>
            <p className="text-xs text-muted-foreground mb-5">Définissez le nom, le niveau et l'icône.</p>

            <form onSubmit={handleTechSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Nom de la compétence *</label>
                <input
                  type="text"
                  required
                  value={techForm.name}
                  onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                  placeholder="Ex: Next.js / Python / Docker"
                  className="w-full px-3 py-2 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-foreground">Niveau de maîtrise ({techForm.level}%)</label>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={techForm.level}
                  onChange={(e) => setTechForm({ ...techForm, level: Number(e.target.value) })}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Icône</label>
                <select
                  value={techForm.iconName}
                  onChange={(e) => setTechForm({ ...techForm, iconName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setIsTechModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-foreground/5 text-foreground font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-sm"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Soft Skill Modal */}
      {isSoftModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 px-4 pb-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-md glass-panel p-6 rounded-[2rem] border border-primary/30 shadow-2xl relative">
            <button
              onClick={() => setIsSoftModalOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-foreground/10 hover:bg-rose-500/20 border border-foreground/15 hover:border-rose-500/40 text-foreground hover:text-rose-400 transition-all shadow-sm"
            >
              <X size={16} />
            </button>

            <h3 className="text-lg font-extrabold text-foreground mb-1">
              {editingSoft ? "Modifier le Soft Skill" : "Nouveau Soft Skill"}
            </h3>
            <p className="text-xs text-muted-foreground mb-5">Ajoutez une qualité humaine ou méthodologique.</p>

            <form onSubmit={handleSoftSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Intitulé du Soft Skill *</label>
                <input
                  type="text"
                  required
                  value={softForm.name}
                  onChange={(e) => setSoftForm({ ...softForm, name: e.target.value })}
                  placeholder="Ex: Communication claire"
                  className="w-full px-3 py-2 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Icône</label>
                <select
                  value={softForm.iconName}
                  onChange={(e) => setSoftForm({ ...softForm, iconName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                >
                  {availableIcons.map((ic) => (
                    <option key={ic} value={ic}>
                      {ic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Thème de couleur</label>
                <select
                  value={softForm.color}
                  onChange={(e) => setSoftForm({ ...softForm, color: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                >
                  {colorPresets.map((cp, idx) => (
                    <option key={idx} value={cp.class}>
                      {cp.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-foreground/10">
                <button
                  type="button"
                  onClick={() => setIsSoftModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-foreground/5 text-foreground font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-sm"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
