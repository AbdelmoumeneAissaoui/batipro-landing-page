// Types pour la configuration de la marque et les données i18n

export interface BrandConfig {
  // Metadata du site
  siteMetadata: {
    title: string;
    description: string;
    favicon?: string;
    ogImage?: string;
    locale?: string;
  };
  
  // Informations de contact globales
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
    hours?: string;
  };
  
  // Couleurs du design
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    surface: string;
    textPrimary: string;
    textMuted: string;
  };
  
  // Sections à afficher/masquer
  sections: {
    showHero: boolean;
    showStats: boolean;
    showCategories: boolean;
    showFeaturedProducts: boolean;
    showPartners: boolean;
    showTeam: boolean;
    showNewsletterBanner: boolean;
    showFooter: boolean;
  };
  
  // Configurations i18n (multilingue)
  i18n: {
    fr: Translation;
    ar: Translation;
  };
}

export interface Translation {
  brand: {
    name: string;
    tagline: string;
    logoImage?: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaLink: string;
    secondaryCtaLabel: string;
    backgroundVideo: string;
    backgroundImage: string;
  };
  ui: {
    categoriesTitle: string;
    productsTitle: string;
    productsLink: string;
    partnersTitle: string;
    teamTitle: string;
    teamSubtitle: string;
    quickLinks: string;
    contactUs: string;
    legal?: string;
    cgv?: string;
    securePayment?: string;
    fastDelivery?: string;
  };
  contact: {
    title: string;
    description: string;
    formPlaceholder: {
      name: string;
      email: string;
      message: string;
    };
  };
  footer: FooterTranslation;
  categories: Category[];
  featuredProducts: Product[];
  stats: Stat[];
  partners: Partner[];
  team: TeamMember[];
  navLinks: NavLink[];
}

export interface Category {
  id: number;
  label: string;
  icon: string;
  image: string;
  productIds?: number[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  badge: string | null;
  rating: number;
  image: string;
  categoryId?: number;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
}

export interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  phone: string;
}

export interface NavLink {
  label: string;
  to: string;
}

export interface Footer {
  copyright: string;
  socials: SocialLink[];
}

export interface FooterTranslation {
  copyright: string;
  socials: SocialLink[];
  links?: NavLink[];
}

export interface SocialLink {
  icon: string;
  url: string;
  label?: string;
}

export type Language = 'fr' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  dir: 'ltr' | 'rtl';
}