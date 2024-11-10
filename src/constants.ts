import {
  ArrowUpRight,
  BarChart2,
  Calendar,
  FileText,
  Folder,
  Globe,
  Mail,
  MessageCircle,
  MessageSquare,
  Package,
  Type,
  Zap,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export type PricingPlans = {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  isOneTimePayment?: boolean;
  notice?: string;
  isMain?: boolean;
  blackList?: string[];
  excludedFeatures?: string[];
};

export type FeatureDetails = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  name: string;
  description: string;
};

const FEATURES = {
  articleGenerator: "Article generator",
  socialPostGenerator: "Social post genereator",
  productDescriptionGenerator: "Product description generator",
  emailGenerator: "Email generator",
  smsGenerator: "Sms generator",
  uCraftTranslate: "uCraft translate",
  socialMediaPlannerCustom: "Social media planner custom generation",
  socialMediaPlannerSmart: "Social media planner smart generation",
  analytics: "Analytics",
  smmAutomation: "SMM Automation",
  projects: (quantity: number) =>
    `${new Intl.NumberFormat().format(quantity)} ${quantity > 1 ? "projects" : "project"}`,
  words: (quantity: number, additionalText = "") =>
    `${new Intl.NumberFormat().format(quantity)} ${quantity > 1 ? `words ${additionalText}` : `word ${additionalText}`}`,
};

export const FEATURE_DETAILS: FeatureDetails[] = [
  { icon: Type, name: "Words", description: "Tracks and manages word count for content" },
  {
    icon: FileText,
    name: "Article generator",
    description: "Creates full-length articles on various topics",
  },
  {
    icon: MessageSquare,
    name: "Social post generator",
    description: "Generates engaging social media posts",
  },
  {
    icon: Package,
    name: "Product description generator",
    description: "Crafts compelling product descriptions",
  },
  {
    icon: Mail,
    name: "Email generator",
    description: "Composes professional emails for various purposes",
  },
  {
    icon: MessageCircle,
    name: "SMS generator",
    description: "Creates concise and effective SMS messages",
  },
  {
    icon: Globe,
    name: "uCraft translate",
    description: "Translates content across multiple languages",
  },
  {
    icon: Calendar,
    name: "Social media planner custom generation",
    description: "Customizes social media content planning",
  },
  {
    icon: Zap,
    name: "Social media planner smart generation",
    description: "Intelligently generates social media content plans",
  },
  { icon: BarChart2, name: "Analytics", description: "Provides insights and data analysis" },
  {
    icon: ArrowUpRight,
    name: "SMM Automation",
    description: "Automates social media marketing tasks",
  },
  { icon: Folder, name: "Projects", description: "Manages multiple projects with ease" },
];

export const PRICING_PLANS: PricingPlans[] = [
  {
    title: "Basic",
    monthlyPrice: 10,
    yearlyPrice: 100,
    description: "Best for small business owners. Get started with basic tools.",
    features: [
      FEATURES.words(50000),
      FEATURES.articleGenerator,
      FEATURES.socialPostGenerator,
      FEATURES.productDescriptionGenerator,
      FEATURES.emailGenerator,
      FEATURES.smsGenerator,
      FEATURES.uCraftTranslate,
      FEATURES.socialMediaPlannerCustom,
      FEATURES.projects(1),
    ],
    excludedFeatures: [
      FEATURES.socialMediaPlannerSmart,
      FEATURES.smmAutomation,
      FEATURES.analytics,
    ],
    notice: "Words resupply by the start of each month, you can refill words as you go if needed",
  },
  {
    title: "Premium",
    monthlyPrice: 50,
    yearlyPrice: 600,
    isMain: true,
    description: "Best for medium size business owners who needs SEO automation.",
    features: [
      FEATURES.words(500000, "2x more words than Basic plan ✨"),
      FEATURES.articleGenerator,
      FEATURES.socialPostGenerator,
      FEATURES.productDescriptionGenerator,
      FEATURES.emailGenerator,
      FEATURES.smsGenerator,
      FEATURES.uCraftTranslate,
      FEATURES.socialMediaPlannerCustom,
      FEATURES.projects(2),
      FEATURES.socialMediaPlannerSmart,
      FEATURES.smmAutomation,
      FEATURES.analytics,
    ],
    notice: "Words resupply by the start of each month, you can refill words as you go if needed",
  },
  {
    title: "Agency",
    monthlyPrice: 150,
    yearlyPrice: 1500,
    description: "Best for large business owners who needs SEO automation.",
    features: [
      FEATURES.words(1500000, "2x more words than Premium plan"),
      FEATURES.articleGenerator,
      FEATURES.socialPostGenerator,
      FEATURES.productDescriptionGenerator,
      FEATURES.emailGenerator,
      FEATURES.smsGenerator,
      FEATURES.uCraftTranslate,
      FEATURES.socialMediaPlannerCustom,
      FEATURES.projects(5),
      FEATURES.socialMediaPlannerSmart,
      FEATURES.smmAutomation,
      FEATURES.analytics,
    ],
    notice: "Words resupply by the start of each month, you can refill words as you go if needed",
  },
];
