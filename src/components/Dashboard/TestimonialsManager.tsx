import React, { useState } from "react";
import { Plus, Edit2, Trash2, MessageSquareQuote, Star, Check, X } from "lucide-react";
import { usePortfolio, type TestimonialItem } from "../../context/PortfolioContext";

export const TestimonialsManager: React.FC = () => {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<TestimonialItem | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingTest(null);
    setFormData({
      name: "",
      role: "Client",
      company: "Entreprise",
      content: "",
      rating: 5,
    });
    setIsFormOpen(true);
  };

  const openEditModal = (test: TestimonialItem) => {
    setEditingTest(test);
    setFormData({
      name: test.name,
      role: test.role,
      company: test.company,
      content: test.content,
      rating: test.rating || 5,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTest) {
      updateTestimonial(editingTest.id, formData);
    } else {
      addTestimonial(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
            <MessageSquareQuote className="text-primary w-6 h-6" />
            Témoignages & Avis ({data.testimonials.length})
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Gérez les retours et recommandations de vos clients et collaborateurs.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          <span>Ajouter un Témoignage</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.testimonials.map((test) => (
          <div
            key={test.id}
            className="glass-panel p-5 rounded-2xl border border-foreground/10 flex flex-col justify-between hover:border-primary/40 transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-sky-400 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                    {test.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{test.name}</h4>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {test.role} {test.company ? `· ${test.company}` : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(test)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                  >
                    <Edit2 size={15} />
                  </button>
                  {deleteConfirmId === test.id ? (
                    <div className="flex items-center gap-1 bg-rose-500/20 p-1 rounded-lg border border-rose-500/30">
                      <button
                        onClick={() => {
                          deleteTestimonial(test.id);
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
                      onClick={() => setDeleteConfirmId(test.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {Array.from({ length: test.rating || 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "{test.content}"
              </p>
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
              {editingTest ? "Modifier le Témoignage" : "Nouveau Témoignage"}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Remplissez les retours du client ou collaborateur.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-foreground mb-1">Nom du client / collaborateur *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Marc Kouassi"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-foreground mb-1">Rôle / Titre</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Ex: Fondateur & CEO"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-foreground mb-1">Entreprise</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ex: InnovTech CI"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Note (Étoiles)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-foreground/5 border border-foreground/15 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value={5}>5 / 5 - Exceptionnel</option>
                  <option value={4}>4 / 5 - Très bien</option>
                  <option value={3}>3 / 5 - Bien</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-foreground mb-1">Message / Commentaire *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Écrivez le retour ou la recommandation..."
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
