import { motion } from "framer-motion";
import { MagicCard } from "../lightswind/magic-card";
import { usePortfolio } from "../../context/PortfolioContext";
import { DynamicIcon } from "../Dashboard/DynamicIcon";

export const ServicesSection = () => {
  const { data } = usePortfolio();
  const { services } = data;

  return (
    <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-gradient-primary">
          Ce que je fais
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
          Des solutions web complètes, du design à la mise en production, pensées pour être rapides, fiables et évolutives.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <MagicCard
              className="h-full p-6 sm:p-8 rounded-[1.75rem] sm:rounded-[2rem] border border-border/80 bg-card/80"
              gradientSize={280}
              gradientColor="rgba(139, 92, 246, 0.05)"
              gradientFrom="rgba(139, 92, 246, 0.25)"
              gradientTo="rgba(100, 116, 139, 0.15)"
            >
              <div className="flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-5 sm:mb-6 shadow-sm transition-all duration-300">
                    <DynamicIcon name={service.iconName || "Code2"} className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2.5 sm:mb-3 text-foreground tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
