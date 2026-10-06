import { motion } from "framer-motion";
import { FolderKanban, ExternalLink, Github, Sparkles, Clock } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { MagicCard } from "../lightswind/magic-card";

export const ProjectsSection = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-10 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-center md:text-left">
          Mes <span className="text-gradient-primary">Projets</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-base sm:text-lg">
          Des projets concrets développés pour apprendre, pratiquer et livrer des solutions réelles.
        </p>
      </motion.div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <MagicCard
                className="h-full p-5 sm:p-7 rounded-[1.75rem] sm:rounded-[2rem] border border-border/80 bg-card/80 flex flex-col justify-between"
                gradientSize={260}
                gradientColor="rgba(139, 92, 246, 0.05)"
                gradientFrom="rgba(139, 92, 246, 0.25)"
                gradientTo="rgba(100, 116, 139, 0.15)"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    {/* Header badge row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20">
                        {project.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {project.featured && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                            <Sparkles size={10} /> En vedette
                          </span>
                        )}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            project.status === "Terminé"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : project.status === "En cours"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                          }`}
                        >
                          ● {project.status || "Terminé"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-foreground mb-2.5 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-foreground/[0.04] border border-foreground/10 text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-foreground/10 text-xs font-bold">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>Voir la démo</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github size={14} />
                          <span>Code source</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-panel rounded-[2.5rem] border border-foreground/10 p-16 flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
              <FolderKanban className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-foreground mb-2">Projets en préparation</h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Les projets ajoutés depuis le dashboard apparaîtront ici automatiquement.
              </p>
            </div>

            <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>Gestionnaire en direct activé</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
