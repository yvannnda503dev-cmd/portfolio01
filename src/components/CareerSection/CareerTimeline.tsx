import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { usePortfolio } from "../../context/PortfolioContext";
import { DynamicIcon } from "../Dashboard/DynamicIcon";

export const CareerTimeline = () => {
  const { data } = usePortfolio();

  const careerEvents = data.career.map((item) => ({
    year: item.year,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    icon: (
      <span className="mr-2 text-primary flex items-center">
        <DynamicIcon name={item.iconName || "Rocket"} className="h-4 w-4" />
      </span>
    ),
  }));

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title="Mon Parcours"
        subtitle="De la curiosité à la pratique, une progression constante"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
