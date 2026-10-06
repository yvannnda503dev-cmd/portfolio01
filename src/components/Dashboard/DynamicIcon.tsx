import React from "react";
import type { LucideProps } from "lucide-react";
import {
  Code2,
  Server,
  Globe,
  Palette,
  Layers,
  Terminal,
  Rocket,
  BookOpen,
  GraduationCap,
  Wrench,
  Brain,
  Lightbulb,
  Workflow,
  Users,
  HeartHandshake,
  FolderKanban,
  Sparkles,
  Cpu,
  Database,
  Layout,
  Shield,
  Zap,
  Star,
  Award,
  Laptop,
  Smartphone,
  Globe2,
  HelpCircle,
} from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

const iconMap: Record<string, React.FC<LucideProps>> = {
  Code2,
  Server,
  Globe,
  Globe2,
  Palette,
  Layers,
  Terminal,
  Rocket,
  BookOpen,
  GraduationCap,
  Wrench,
  Brain,
  Lightbulb,
  Workflow,
  Users,
  HeartHandshake,
  FolderKanban,
  Sparkles,
  Cpu,
  Database,
  Layout,
  Shield,
  Zap,
  Star,
  Award,
  Laptop,
  Smartphone,
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent {...props} />;
};

export const availableIcons = Object.keys(iconMap);
