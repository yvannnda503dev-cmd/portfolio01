import React, { createContext, useContext, useState, useEffect } from "react";

export interface ProfileData {
  name: string;
  role: string;
  badgeId: string;
  statusText: string;
  specialty: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  heroBio: string;
  aboutText1: string;
  aboutText2: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: "Terminé" | "En cours" | "Prévu";
}

export interface CareerItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  year: string;
  badge: string;
  badgeColor: string;
  iconName: string;
  details: string[];
}

export interface TechSkillItem {
  id: string;
  name: string;
  level: number;
  iconName: string;
  color: string;
}

export interface SoftSkillItem {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string; // ISO date string
  read: boolean;
}

export interface PortfolioData {
  profile: ProfileData;
  stats: StatItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  career: CareerItem[];
  education: EducationItem[];
  techSkills: TechSkillItem[];
  softSkills: SoftSkillItem[];
  testimonials: TestimonialItem[];
  messages: ContactMessage[];
}

const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "N'da Koffi Dariel Yvann",
    role: "Développeur Web Full-Stack",
    badgeId: "NK-2025-DEV",
    statusText: "Disponible pour des projets",
    specialty: "React · Node · PHP",
    location: "Abidjan, CI",
    email: "yvannnda503@gmail.com",
    phone: "+2250789376327",
    github: "https://github.com/yvannnda503dev-cmd",
    heroBio:
      "Développeur Full-Stack passionné par l'expérience utilisateur. Je façonne des interfaces dynamiques avec React et bâtis des architectures solides avec Node.js et PHP.",
    aboutText1:
      "Développeur Full-Stack passionné par l'expérience utilisateur, je façonne des interfaces dynamiques et modernes avec React. Côté serveur, j'associe l'écosystème agile de Node.js à la fiabilité éprouvée de PHP pour bâtir des architectures solides et évolutives.",
    aboutText2:
      "Mon objectif est de transformer des mécaniques complexes en applications web fluides, rapides et parfaitement intuitives. Chaque projet est une opportunité d'apprendre, de progresser et de livrer quelque chose dont je suis fier.",
  },
  stats: [
    { id: "stat-1", label: "Technologies maîtrisées", value: "5+", iconName: "Layout" },
    { id: "stat-2", label: "Projets réalisés", value: "10+", iconName: "Code2" },
    { id: "stat-3", label: "Projets en cours", value: "3", iconName: "FolderKanban" },
    { id: "stat-4", label: "Basé à", value: "Abidjan", iconName: "Globe2" },
  ],
  services: [
    {
      id: "srv-1",
      title: "Développement Front-End",
      description:
        "Création d'interfaces modernes, réactives et accessibles avec HTML, CSS, JavaScript et React. Focus sur la performance et l'expérience utilisateur.",
      iconName: "Code2",
    },
    {
      id: "srv-2",
      title: "Développement Back-End",
      description:
        "Conception d'APIs robustes et de logiques serveur fiables avec Node.js et PHP. Gestion de bases de données, authentification et sécurité.",
      iconName: "Server",
    },
    {
      id: "srv-3",
      title: "Applications Full-Stack",
      description:
        "Développement complet d'applications web de A à Z : de la conception de la base de données au déploiement en passant par l'interface utilisateur.",
      iconName: "Globe",
    },
    {
      id: "srv-4",
      title: "Intégration UI/UX",
      description:
        "Transformation de maquettes et designs en interfaces pixel-perfect. Animations fluides, responsive design et accessibilité au cœur de chaque projet.",
      iconName: "Palette",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Portfolio Interactif 3D & LightsWind",
      description:
        "Portfolio personnel hautement animé avec Framer Motion, Lenis Scroll, badge interactif 3D et tableau de bord d'administration en temps réel.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "Full-Stack",
      demoUrl: "https://github.com/yvannnda503dev-cmd",
      githubUrl: "https://github.com/yvannnda503dev-cmd",
      featured: true,
      status: "Terminé",
    },
    {
      id: "proj-2",
      title: "Plateforme E-commerce & Gestion CRUD",
      description:
        "Application web complète avec panier d'achat en temps réel, authentification sécurisée, gestion des commandes et back-office PHP / MySQL.",
      tags: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
      category: "Back-End",
      demoUrl: "https://github.com/yvannnda503dev-cmd",
      githubUrl: "https://github.com/yvannnda503dev-cmd",
      featured: true,
      status: "En cours",
    },
    {
      id: "proj-3",
      title: "API RESTful & Dashboard Analytique",
      description:
        "Microservices Node.js avec Express, JWT et MongoDB permettant le suivi en temps réel de métriques clés et la gestion des utilisateurs.",
      tags: ["Node.js", "Express", "React", "MongoDB"],
      category: "Full-Stack",
      demoUrl: "https://github.com/yvannnda503dev-cmd",
      githubUrl: "https://github.com/yvannnda503dev-cmd",
      featured: false,
      status: "En cours",
    },
  ],
  career: [
    {
      id: "car-1",
      year: "2025 – Présent",
      title: "Développeur Web Freelance",
      subtitle: "Projets personnels & clients",
      description:
        "Développement d'applications web complètes pour des clients et projets personnels. Conception d'interfaces React modernes, intégration de back-ends PHP et Node.js, et déploiement de solutions fonctionnelles.",
      iconName: "Rocket",
    },
    {
      id: "car-2",
      year: "2024",
      title: "Projets Full-Stack concrets",
      subtitle: "Auto-formation intensive",
      description:
        "Réalisation de plusieurs projets complets : applications CRUD, systèmes d'authentification, dashboards interactifs. Mise en pratique de React, Node.js, PHP et MySQL sur des cas réels.",
      iconName: "Code2",
    },
    {
      id: "car-3",
      year: "2023 – 2024",
      title: "Apprentissage du développement web",
      subtitle: "Formation autodidacte",
      description:
        "Découverte et maîtrise progressive du développement web : HTML, CSS, JavaScript, puis PHP côté serveur. Premiers projets pratiques pour consolider les bases techniques.",
      iconName: "BookOpen",
    },
    {
      id: "car-4",
      year: "2023",
      title: "Premiers pas en programmation",
      subtitle: "Démarrage du parcours tech",
      description:
        "Curiosité pour le code transformée en passion. Premiers tutoriels, premières lignes HTML et CSS, et décision de se former sérieusement au développement web.",
      iconName: "Wrench",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Formation en cours",
      school: "Auto-formation & Pratique",
      year: "2023 – Présent",
      badge: "En progression",
      badgeColor: "text-primary bg-primary/10 border-primary/30",
      iconName: "GraduationCap",
      details: [
        "Apprentissage du développement web front-end : HTML, CSS, JavaScript",
        "Maîtrise progressive de React.js pour les interfaces modernes",
        "Développement back-end avec PHP et Node.js",
        "Réalisation de projets concrets pour consolider les acquis",
      ],
    },
    {
      id: "edu-2",
      degree: "Baccalauréat & Études générales",
      school: "Abidjan, Côte d'Ivoire",
      year: "Avant 2023",
      badge: "Diplômé",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      iconName: "BookOpen",
      details: [
        "Parcours scolaire classique en Côte d'Ivoire",
        "Initiation à l'informatique et aux outils numériques",
        "Développement d'une rigueur analytique et méthodologique",
        "Intérêt précoce pour la technologie et la création digitale",
      ],
    },
  ],
  techSkills: [
    { id: "ts-1", name: "HTML / CSS", level: 90, iconName: "Globe", color: "text-orange-400" },
    { id: "ts-2", name: "JavaScript", level: 82, iconName: "Code2", color: "text-yellow-400" },
    { id: "ts-3", name: "React.js", level: 78, iconName: "Layers", color: "text-cyan-400" },
    { id: "ts-4", name: "PHP", level: 75, iconName: "Server", color: "text-indigo-400" },
    { id: "ts-5", name: "Node.js", level: 70, iconName: "Terminal", color: "text-emerald-400" },
    { id: "ts-6", name: "Tailwind CSS", level: 85, iconName: "Layers", color: "text-sky-400" },
    { id: "ts-7", name: "MySQL", level: 72, iconName: "Server", color: "text-blue-400" },
    { id: "ts-8", name: "Git / GitHub", level: 80, iconName: "Terminal", color: "text-red-400" },
  ],
  softSkills: [
    { id: "ss-1", name: "Apprentissage rapide", iconName: "Brain", color: "text-purple-400 border-purple-500/30 bg-purple-500/10" },
    { id: "ss-2", name: "Résolution de problèmes", iconName: "Lightbulb", color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10" },
    { id: "ss-3", name: "Méthodologie Agile", iconName: "Workflow", color: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
    { id: "ss-4", name: "Travail en équipe", iconName: "Users", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
    { id: "ss-5", name: "Curiosité technique", iconName: "BookOpen", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" },
    { id: "ss-6", name: "Autonomie", iconName: "HeartHandshake", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  ],
  testimonials: [
    {
      id: "test-1",
      name: "Marc Kouassi",
      role: "Chef de Projet Digital",
      company: "InnovTech CI",
      content:
        "Yvann est un développeur très rigoureux et rapide à l'exécution. Son sens du design et son écoute ont permis de livrer notre projet dans les temps avec une qualité remarquable.",
      rating: 5,
    },
    {
      id: "test-2",
      name: "Awa Touré",
      role: "Fondatrice",
      company: "AfriCraft",
      content:
        "Une collaboration fluide et très agréable. Yvann a su transformer notre vision en une application web moderne et facile à utiliser. Je le recommande vivement !",
      rating: 5,
    },
  ],
  messages: [],
};

const STORAGE_KEY = "nda_portfolio_data_v1";

interface PortfolioContextType {
  data: PortfolioData;
  // Profile
  updateProfile: (profile: Partial<ProfileData>) => void;
  // Stats
  updateStat: (id: string, stat: Partial<StatItem>) => void;
  // Services
  addService: (service: Omit<ServiceItem, "id">) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  // Projects
  addProject: (project: Omit<ProjectItem, "id">) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Career
  addCareer: (career: Omit<CareerItem, "id">) => void;
  updateCareer: (id: string, career: Partial<CareerItem>) => void;
  deleteCareer: (id: string) => void;
  // Education
  addEducation: (edu: Omit<EducationItem, "id">) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  // Tech Skills
  addTechSkill: (skill: Omit<TechSkillItem, "id">) => void;
  updateTechSkill: (id: string, skill: Partial<TechSkillItem>) => void;
  deleteTechSkill: (id: string) => void;
  // Soft Skills
  addSoftSkill: (skill: Omit<SoftSkillItem, "id">) => void;
  updateSoftSkill: (id: string, skill: Partial<SoftSkillItem>) => void;
  deleteSoftSkill: (id: string) => void;
  // Testimonials
  addTestimonial: (test: Omit<TestimonialItem, "id">) => void;
  updateTestimonial: (id: string, test: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  // Messages
  addMessage: (msg: Omit<ContactMessage, "id" | "receivedAt" | "read">) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  unreadCount: number;
  // Global actions
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
  // Auth state
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to prevent missing fields on upgrades
        return {
          ...defaultPortfolioData,
          ...parsed,
          profile: { ...defaultPortfolioData.profile, ...(parsed.profile || {}) },
          messages: parsed.messages || [],
        };
      }
    } catch (e) {
      console.error("Failed to load portfolio data from localStorage:", e);
    }
    return defaultPortfolioData;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("admin_authenticated") === "true";
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save portfolio data to localStorage:", e);
    }
  }, [data]);

  const handleSetAuthenticated = (auth: boolean) => {
    setIsAuthenticated(auth);
    try {
      if (auth) {
        sessionStorage.setItem("admin_authenticated", "true");
      } else {
        sessionStorage.removeItem("admin_authenticated");
      }
    } catch {}
  };

  // Profile
  const updateProfile = (profileUpdate: Partial<ProfileData>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate },
    }));
  };

  // Stats
  const updateStat = (id: string, statUpdate: Partial<StatItem>) => {
    setData((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, ...statUpdate } : s)),
    }));
  };

  // Services
  const addService = (service: Omit<ServiceItem, "id">) => {
    const newService: ServiceItem = { ...service, id: "srv-" + Date.now() };
    setData((prev) => ({ ...prev, services: [...prev.services, newService] }));
  };

  const updateService = (id: string, serviceUpdate: Partial<ServiceItem>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...serviceUpdate } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  // Projects
  const addProject = (project: Omit<ProjectItem, "id">) => {
    const newProject: ProjectItem = { ...project, id: "proj-" + Date.now() };
    setData((prev) => ({ ...prev, projects: [newProject, ...prev.projects] }));
  };

  const updateProject = (id: string, projectUpdate: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...projectUpdate } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  // Career
  const addCareer = (career: Omit<CareerItem, "id">) => {
    const newCareer: CareerItem = { ...career, id: "car-" + Date.now() };
    setData((prev) => ({ ...prev, career: [newCareer, ...prev.career] }));
  };

  const updateCareer = (id: string, careerUpdate: Partial<CareerItem>) => {
    setData((prev) => ({
      ...prev,
      career: prev.career.map((c) => (c.id === id ? { ...c, ...careerUpdate } : c)),
    }));
  };

  const deleteCareer = (id: string) => {
    setData((prev) => ({
      ...prev,
      career: prev.career.filter((c) => c.id !== id),
    }));
  };

  // Education
  const addEducation = (edu: Omit<EducationItem, "id">) => {
    const newEdu: EducationItem = { ...edu, id: "edu-" + Date.now() };
    setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, eduUpdate: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...eduUpdate } : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  // Tech Skills
  const addTechSkill = (skill: Omit<TechSkillItem, "id">) => {
    const newSkill: TechSkillItem = { ...skill, id: "ts-" + Date.now() };
    setData((prev) => ({ ...prev, techSkills: [...prev.techSkills, newSkill] }));
  };

  const updateTechSkill = (id: string, skillUpdate: Partial<TechSkillItem>) => {
    setData((prev) => ({
      ...prev,
      techSkills: prev.techSkills.map((s) => (s.id === id ? { ...s, ...skillUpdate } : s)),
    }));
  };

  const deleteTechSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      techSkills: prev.techSkills.filter((s) => s.id !== id),
    }));
  };

  // Soft Skills
  const addSoftSkill = (skill: Omit<SoftSkillItem, "id">) => {
    const newSkill: SoftSkillItem = { ...skill, id: "ss-" + Date.now() };
    setData((prev) => ({ ...prev, softSkills: [...prev.softSkills, newSkill] }));
  };

  const updateSoftSkill = (id: string, skillUpdate: Partial<SoftSkillItem>) => {
    setData((prev) => ({
      ...prev,
      softSkills: prev.softSkills.map((s) => (s.id === id ? { ...s, ...skillUpdate } : s)),
    }));
  };

  const deleteSoftSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      softSkills: prev.softSkills.filter((s) => s.id !== id),
    }));
  };

  // Testimonials
  const addTestimonial = (test: Omit<TestimonialItem, "id">) => {
    const newTest: TestimonialItem = { ...test, id: "test-" + Date.now() };
    setData((prev) => ({ ...prev, testimonials: [newTest, ...prev.testimonials] }));
  };

  const updateTestimonial = (id: string, testUpdate: Partial<TestimonialItem>) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...testUpdate } : t)),
    }));
  };

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  // Messages
  const addMessage = (msg: Omit<ContactMessage, "id" | "receivedAt" | "read">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: "msg-" + Date.now(),
      receivedAt: new Date().toISOString(),
      read: false,
    };
    setData((prev) => ({ ...prev, messages: [newMsg, ...(prev.messages || [])] }));
  };

  const markMessageRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).map((m) => (m.id === id ? { ...m, read: true } : m)),
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: (prev.messages || []).filter((m) => m.id !== id),
    }));
  };

  const unreadCount = (data.messages || []).filter((m) => !m.read).length;

  // Global actions
  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
    } catch {}
  };

  const exportDataJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === "object" && parsed.profile) {
        setData({
          ...defaultPortfolioData,
          ...parsed,
        });
        return true;
      }
    } catch (e) {
      console.error("Import failed:", e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateProfile,
        updateStat,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addCareer,
        updateCareer,
        deleteCareer,
        addEducation,
        updateEducation,
        deleteEducation,
        addTechSkill,
        updateTechSkill,
        deleteTechSkill,
        addSoftSkill,
        updateSoftSkill,
        deleteSoftSkill,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addMessage,
        markMessageRead,
        deleteMessage,
        unreadCount,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
        isAuthenticated,
        setIsAuthenticated: handleSetAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isDashboardOpen,
        setIsDashboardOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
