import React, { useState } from "react";
import { Plus, Edit2, Trash2, Sparkles, Check, X } from "lucide-react";
import { usePortfolio, type ServiceItem } from "../../context/PortfolioContext";
import { DynamicIcon, availableIcons } from "./DynamicIcon";

export const ServicesManager: React.FC = () => {
  const { data, addService, updateService, deleteService } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    iconName: "Code2",
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      iconName: "Code2",
    });
    setIsFormOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      iconName: service.iconName || "Code2",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <Sparkles className="text-primary w-6 h-6" />
            Services Proposés ({data.services.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez vos offres de services, expertises et compétences métiers.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>Ajouter un Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.services.map((service) => (
          <div
            key={service.id}
            className="glass-panel p-5 rounded-2xl border border-foreground/10 flex flex-col justify-between hover:border-primary/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                  <DynamicIcon name={service.iconName || "Code2"} size={20} />
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(service)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                    title="Modifier"
                  >
                    <Edit2 size={15} />
                  </button>
                  {deleteConfirmId === service.id ? (
                    <div className="flex items-center gap-1 bg-rose-500/20 p-1 rounded-lg border border-rose-500/30">
                      <button
                        onClick={() => {
                          deleteService(service.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold"
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
                      onClick={() => setDeleteConfirmId(service.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10"
                      title="Supprimer"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              <h4 className="text-base font-bold text-foreground mb-1.5">{service.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
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
              {editingService ? "Modifier le Service" : "Nouveau Service"}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Définissez le titre, la description et l'icône du service.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Titre du service *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Développement Front-End"
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

              <div>
                <label className="block font-bold text-foreground mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Expliquez ce que vous proposez pour ce service..."
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
