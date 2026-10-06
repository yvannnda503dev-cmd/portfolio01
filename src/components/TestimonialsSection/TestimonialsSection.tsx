import { motion } from "framer-motion";
import { MessageSquareDashed, Star } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const TestimonialsSection = () => {
  const { data } = usePortfolio();
  const { testimonials } = data;

  return (
    <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
          Ils me font <span className="text-gradient-primary">confiance</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
          Les retours de personnes avec qui j'ai collaboré ou pour qui j'ai livré des projets.
        </p>
      </motion.div>

      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {testimonials.map((test, i) => {
            const initials = test.name
              .split(" ")
              .slice(0, 2)
              .map((w: string) => w[0])
              .join("")
              .toUpperCase();

            return (
              <motion.div
                key={test.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="relative h-full rounded-2xl border border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-7 flex flex-col gap-5 overflow-hidden">

                  {/* Large background quote mark */}
                  <span className="absolute top-4 left-4 text-[6rem] leading-none font-serif text-foreground/[0.06] select-none pointer-events-none">
                    "
                  </span>

                  {/* Header : avatar + name + stars */}
                  <div className="flex items-center justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      {/* Avatar initiales */}
                      <div className="w-11 h-11 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                        <span className="text-sm font-extrabold text-foreground tracking-tight">
                          {initials}
                        </span>
                      </div>
                      <div className="leading-tight">
                        <p className="text-sm font-extrabold text-foreground">
                          {test.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {test.role}{test.company ? ` · ${test.company}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: test.rating || 5 }).map((_, r) => (
                        <Star key={r} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border/60 relative z-10" />

                  {/* Quote text */}
                  <p className="text-sm sm:text-[0.9rem] text-muted-foreground leading-relaxed relative z-10 flex-1">
                    {test.content}"
                  </p>

                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Placeholder */
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
              <MessageSquareDashed className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-foreground mb-2">Témoignages à venir</h3>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Les retours clients ajoutés depuis le dashboard apparaîtront directement ici.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default TestimonialsSection;
