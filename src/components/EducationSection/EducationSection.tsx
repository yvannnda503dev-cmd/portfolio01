import SkillCategory from "./SkillCategory";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2, Calendar, Building2, Info } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";
import { usePortfolio } from "../../context/PortfolioContext";
import { DynamicIcon } from "../Dashboard/DynamicIcon";

export const EducationSection = () => {
  const { data } = usePortfolio();
  const { education } = data;

  return (
    <section id="education" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-16 sm:space-y-20">

      {/* Education Header & Cards */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Parcours <span className="text-gradient-primary">& Formation</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            Un apprentissage principalement pratique, orienté projets réels et auto-formation continue.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <MagicCard
                className="h-full p-8 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl"
                gradientSize={300}
                gradientColor="rgba(139, 92, 246, 0.05)"
                gradientFrom="rgba(139, 92, 246, 0.25)"
                gradientTo="rgba(100, 116, 139, 0.15)"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center shadow-sm">
                        <DynamicIcon name={edu.iconName || "GraduationCap"} className="w-7 h-7 text-primary" />
                      </div>
                      <span className={`px-3.5 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${edu.badgeColor || "text-primary bg-primary/10 border-primary/30"}`}>
                        <Info className="w-3.5 h-3.5" />
                        {edu.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-2">
                      {edu.degree}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground mb-6 pb-4 border-b border-border/60">
                      <span className="flex items-center gap-1.5 text-foreground font-bold">
                        <Building2 className="w-3.5 h-3.5 text-primary" /> {edu.school}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 font-mono text-primary font-bold">
                        <Calendar className="w-3.5 h-3.5" /> {edu.year}
                      </span>
                    </div>

                    <ul className="space-y-3.5">
                      {edu.details.map((detail, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90 font-medium">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <SkillCategory />
      </div>

    </section>
  );
};
