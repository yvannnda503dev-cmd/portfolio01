import "./App.css";
import Header from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { ServicesSection } from "./components/ServicesSection/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { CareerTimeline } from "./components/CareerSection/CareerTimeline";
import TestimonialsSection from "./components/TestimonialsSection/TestimonialsSection";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { Footer } from "./components/Footer/Footer";
import ReactLenis from "lenis/react";
import { MobileBottomNav } from "./components/Navigation/MobileBottomNav";
import { BubbleExplosionTransition } from "./components/CareerSection/BubbleExplosionTransition";
import { PortfolioProvider } from "./context/PortfolioContext";
import { AuthModal } from "./components/Dashboard/AuthModal";
import { DashboardModal } from "./components/Dashboard/DashboardModal";

function AppContent() {
  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground pb-16 md:pb-0">
      <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
        <Header />

        <main className="w-full flex flex-col pt-6 sm:pt-10 border-none">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <CareerTimeline />
          <BubbleExplosionTransition>
            <EducationSection />
          </BubbleExplosionTransition>
          <TestimonialsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile-Only Bottom Navigation Bar */}
        <MobileBottomNav />
      </ReactLenis>

      {/* Admin Dashboard & Auth Modal - Placed outside Lenis for full native touchpad scroll */}
      <AuthModal />
      <DashboardModal />
    </div>
  );
}

function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;
