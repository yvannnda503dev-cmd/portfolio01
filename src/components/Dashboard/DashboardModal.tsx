import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Briefcase,
  GraduationCap,
  Layers,
  Sparkles,
  MessageSquareQuote,
  User,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  X,
  Menu,
  Inbox,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { ThemeToggle } from "../lightswind/theme-toggle";
import { OverviewManager } from "./OverviewManager";
import { ProjectsManager } from "./ProjectsManager";
import { CareerManager } from "./CareerManager";
import { EducationManager } from "./EducationManager";
import { SkillsManager } from "./SkillsManager";
import { ServicesManager } from "./ServicesManager";
import { TestimonialsManager } from "./TestimonialsManager";
import { ProfileManager } from "./ProfileManager";
import { MessagesManager } from "./MessagesManager";

export const DashboardModal: React.FC = () => {
  const {
    isDashboardOpen,
    setIsDashboardOpen,
    setIsAuthenticated,
    data,
    unreadCount,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  if (!isDashboardOpen) return null;

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "messages", label: `Messages${unreadCount > 0 ? ` (${unreadCount})` : ""}`, icon: Inbox },
    { id: "projects", label: `Projets (${data.projects.length})`, icon: FolderKanban },
    { id: "career", label: `Parcours (${data.career.length})`, icon: Briefcase },
    { id: "education", label: `Formation (${data.education.length})`, icon: GraduationCap },
    { id: "skills", label: `Compétences (${data.techSkills.length + data.softSkills.length})`, icon: Layers },
    { id: "services", label: `Services (${data.services.length})`, icon: Sparkles },
    { id: "testimonials", label: `Témoignages (${data.testimonials.length})`, icon: MessageSquareQuote },
    { id: "profile", label: "Profil & Contact", icon: User },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDashboardOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-background/95 backdrop-blur-2xl flex flex-col overflow-hidden text-foreground">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[350px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-foreground/10 bg-card/60 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            className="md:hidden p-2 rounded-xl glass-panel border border-foreground/10 text-muted-foreground hover:text-foreground"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-lg border border-primary/20">
              <img src="/NDADEV_logo.png" alt="NDADEV Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm tracking-tight text-foreground">
                  Portfolio Admin Dashboard
                </h1>
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  En direct
                </span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-primary text-primary-foreground animate-pulse">
                    {unreadCount} msg
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground font-medium">
                {data.profile.name} · Gestion en temps réel
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            onClick={() => setIsDashboardOpen(false)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl glass-panel border border-foreground/10 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Voir le portfolio</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-bold transition-all cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>

          <button
            onClick={() => setIsDashboardOpen(false)}
            className="p-2 rounded-xl glass-panel border border-foreground/10 text-muted-foreground hover:text-foreground hover:scale-105 transition-all"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar and Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-foreground/10 bg-card/30 backdrop-blur-md p-4 space-y-1.5 overflow-y-auto" data-lenis-prevent>
          <div className="px-3 py-2 text-[10px] font-extrabold tracking-widest uppercase text-muted-foreground">
            Navigation
          </div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon size={16} className={isActive ? "text-primary-foreground" : "text-foreground/70"} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpenMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpenMobile(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden flex"
            >
              <motion.div
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="w-64 bg-card border-r border-foreground/10 h-full p-4 flex flex-col space-y-2 shadow-2xl"
                data-lenis-prevent>
                <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
                  <span className="text-xs font-bold text-foreground">Menu Dashboard</span>
                  <button onClick={() => setIsSidebarOpenMobile(false)} className="p-1 text-muted-foreground">
                    <X size={16} />
                  </button>
                </div>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsSidebarOpenMobile(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" data-lenis-prevent>
          <div className="max-w-5xl mx-auto">
            {activeTab === "overview" && (
              <OverviewManager onNavigateTab={(tab) => setActiveTab(tab)} />
            )}
            {activeTab === "messages" && <MessagesManager />}
            {activeTab === "projects" && <ProjectsManager />}
            {activeTab === "career" && <CareerManager />}
            {activeTab === "education" && <EducationManager />}
            {activeTab === "skills" && <SkillsManager />}
            {activeTab === "services" && <ServicesManager />}
            {activeTab === "testimonials" && <TestimonialsManager />}
            {activeTab === "profile" && <ProfileManager />}
          </div>
        </main>
      </div>
    </div>
  );
};
