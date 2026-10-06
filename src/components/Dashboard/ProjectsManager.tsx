import React, { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Github, Sparkles, FolderKanban, Check, X } from "lucide-react";
import { usePortfolio, type ProjectItem } from "../../context/PortfolioContext";

export const ProjectsManager: React.FC = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "Full-Stack",
    demoUrl: "",
    githubUrl: "",
    status: "Terminé" as "Terminé" | "En cours" | "Prévu",
    featured: false,
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      tags: "React, TypeScript, Tailwind CSS",
      category: "Full-Stack",
      demoUrl: "",
      githubUrl: "",
      status: "Terminé",
      featured: false,
    });
    setIsFormOpen(true);
  };

  const openEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(", "),
      category: project.category || "Full-Stack",
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
      status: project.status || "Terminé",
      featured: project.featured || false,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      updateProject(editingProject.id, {
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        category: formData.category,
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
        status: formData.status,
        featured: formData.featured,
      });
    } else {
      addProject({
        title: formData.title,
        description: formData.description,
        tags: tagsArray,
        category: formData.category,
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
        status: formData.status,
        featured: formData.featured,
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <FolderKanban className="text-primary w-6 h-6" />
            Gestion des Projets ({data.projects.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ajoutez, mettez à jour ou supprimez vos projets et études de cas.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>Ajouter un Projet</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.projects.map((proj) => (
          <div
            key={proj.id}
            className="glass-panel p-5 rounded-2xl border border-foreground/10 flex flex-col justify-between group hover:border-primary/40 transition-all relative overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-primary/10 text-primary border border-primary/20">
                    {proj.category}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      proj.status === "Terminé"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : proj.status === "En cours"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                    }`}
                  >
                    ● {proj.status || "Terminé"}
                  </span>
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <Sparkles size={10} /> Mis en avant
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                    title="Modifier"
                  >
                    <Edit2 size={15} />
                  </button>
                  {deleteConfirmId === proj.id ? (
                    <div className="flex items-center gap-1 bg-rose-500/20 p-1 rounded-lg border border-rose-500/30">
                      <button
                        onClick={() => {
                          deleteProject(proj.id);
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
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              <h4 className="text-base font-bold text-foreground mb-1.5">{proj.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                {proj.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {proj.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-foreground/10 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {(proj.demoUrl || proj.githubUrl) && (
                <div className="flex items-center gap-3 pt-3 border-t border-foreground/10 text-xs">
                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline font-bold text-[11px]"
                    >
                      <ExternalLink size={12} /> Démo en direct
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium text-[11px]"
                    >
                      <Github size={12} /> Code source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {data.projects.length === 0 && (
        <div className="glass-panel p-10 rounded-2xl text-center border border-dashed border-foreground/20">
          <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <h4 className="font-bold text-foreground">Aucun projet enregistré</h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Cliquez sur "Ajouter un Projet" pour ajouter votre première réalisation au portfolio.
          </p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 px-4 pb-4 bg-background/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl glass-panel p-6 sm:p-8 rounded-[2rem] border border-primary/30 shadow-2xl relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-foreground/10 hover:bg-rose-500/20 border border-foreground/15 hover:border-rose-500/40 text-foreground hover:text-rose-400 transition-all shadow-sm"
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-extrabold text-foreground mb-1">
              {editingProject ? "Modifier le Projet" : "Nouveau Projet"}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Remplissez les détails du projet pour l'afficher sur le portfolio.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Titre du projet *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Portfolio LightsWind 3D"
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
                  placeholder="Présentation des fonctionnalités clés, des défis relevés et des technologies utilisées..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Statut</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Terminé" | "En cours" | "Prévu",
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Terminé">Terminé</option>
                    <option value="En cours">En cours</option>
                    <option value="Prévu">Prévu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">
                  Technologies / Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS, PHP"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">URL Démo / Site</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">URL GitHub / Code</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                />
                <label htmlFor="featured-check" className="font-semibold text-foreground cursor-pointer">
                  Mettre en avant sur la page d'accueil
                </label>
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
                  <span>{editingProject ? "Enregistrer" : "Créer le projet"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
