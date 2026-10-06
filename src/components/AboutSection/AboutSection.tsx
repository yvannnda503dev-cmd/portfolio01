import { motion } from "framer-motion";
import { usePortfolio } from "../../context/PortfolioContext";
import { DynamicIcon } from "../Dashboard/DynamicIcon";

export const AboutSection = () => {
  const { data } = usePortfolio();
  const { profile, stats } = data;

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        className="flex flex-col md:flex-row gap-10 md:gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Passionné par <span className="text-gradient-primary">le Web & le Code</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {profile.aboutText1}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-4">
              {profile.aboutText2}
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id || i}
              className="glass-panel p-4 sm:p-6 rounded-2xl border border-foreground/10 hover:border-primary/50 transition-colors group relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
              <div className="text-primary mb-3 sm:mb-4 p-2.5 sm:p-3 bg-primary/10 w-max rounded-xl">
                <DynamicIcon name={stat.iconName || "Code2"} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-0.5 sm:mb-1">{stat.value}</h3>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
