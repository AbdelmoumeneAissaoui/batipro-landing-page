# 📚 Exemples d'Adaptation - Guide Pratique

Ce guide montre des exemples concrets d'adaptation du template pour différents cas d'usage.

## Table des matières

1. [Exemple 1: E-commerce de chaussures](#exemple-1-e-commerce-de-chaussures)
2. [Exemple 2: Agence SaaS](#exemple-2-agence-saas)
3. [Exemple 3: Restaurant/Café](#exemple-3-restaurantcafé)
4. [Exemple 4: Ajout d'une nouvelle section](#exemple-4-ajout-dune-nouvelle-section)

---

## Exemple 1: E-commerce de chaussures

### Fichier: `app/config/brand.ts`

**Avant** (BatiPro - Matériaux):
```typescript
export const brandConfig = {
  contact: {
    email: "contact@batipro.fr",
    phone: "+33 1 23 45 67 89",
    address: "123 Zone Industrielle",
    city: "Paris",
  },
  colors: {
    primary: "#003CE8",
    accent: "#bd3b07",
  },
  i18n: {
    fr: {
      brand: {
        name: "Boukabes Céramique",
        tagline: "L'excellence pour vos chantiers",
      },
      // ...
    }
  }
}
```

**Après** (Shoe Store):
```typescript
export const brandConfig = {
  contact: {
    email: "contact@shoeniverse.com",
    phone: "+33 4 56 78 90 12",
    address: "42 Boulevard Maréchal",
    city: "Lyon",
    country: "France",
    zipCode: "69000",
    hours: "Lun-Sam: 10h-19h | Dim: 14h-19h",
  },
  colors: {
    primary: "#FF6B35",      // Orange vibrant
    secondary: "#004E89",    // Bleu foncé
    accent: "#F77F00",       // Orange chaud
    dark: "#06283D",
    surface: "#ffffff",
    textPrimary: "#06283D",
    textMuted: "#004E89",
  },
  i18n: {
    fr: {
      brand: {
        name: "ShoeNiverse",
        tagline: "Vos pas, notre passion",
        logoImage: "/logo-shoes.png",
      },
      hero: {
        headline: "Marchez au Rythme de la Tendance",
        subheadline: "Découvrez notre collection 2026 de sneakers, baskets et chaussures sport.",
        ctaLabel: "Parcourir la collection",
        ctaLink: "#categories",
        secondaryCtaLabel: "Accès VIP",
        backgroundVideo: "/videos/shoes-intro.mp4",
        backgroundImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      },
      ui: {
        categoriesTitle: "Nos Collections",
        productsTitle: "Nouveautés",
        productsLink: "Voir tous les modèles →",
        partnersTitle: "Nos marques partenaires",
        teamTitle: "Notre équipe style",
        teamSubtitle: "Conseils d'experts pour trouver la chaussure parfaite",
        quickLinks: "Liens Rapides",
        contactUs: "Nous contacter",
      },
      categories: [
        {
          id: 1,
          label: "Sneakers",
          icon: "ShoppingCart",
          image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
          productIds: [1, 2],
        },
        {
          id: 2,
          label: "Baskets",
          icon: "Home",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          productIds: [3, 4],
        },
        {
          id: 3,
          label: "Chaussures de sport",
          icon: "Zap",
          image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
          productIds: [5, 6],
        },
        {
          id: 4,
          label: "Chaussures de luxe",
          icon: "Heart",
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
          productIds: [7, 8],
        },
      ],
      featuredProducts: [
        {
          id: 1,
          name: "Nike Air Max 90 Retro",
          price: "129.99€",
          badge: "Best Seller",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
          categoryId: 1,
        },
        {
          id: 2,
          name: "Adidas Ultraboost 22",
          price: "189.99€",
          badge: "Nouveau",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1515521596-5c07fde433a8",
          categoryId: 1,
        },
        {
          id: 3,
          name: "New Balance 574",
          price: "99.99€",
          badge: "Promo",
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
          categoryId: 2,
        },
        {
          id: 4,
          name: "Puma Future Rider",
          price: "124.99€",
          badge: null,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
          categoryId: 2,
        },
      ],
      stats: [
        { value: "50K+", label: "Clients satisfaits" },
        { value: "1000+", label: "Modèles disponibles" },
        { value: "24h", label: "Livraison gratuite" },
      ],
      partners: [
        { id: 1, name: "Nike", logo: "https://logowik.com/content/uploads/2023/06/nike-logo.svg" },
        { id: 2, name: "Adidas", logo: "https://logowik.com/content/uploads/2023/06/adidas-logo.svg" },
        { id: 3, name: "Puma", logo: "https://logowik.com/content/uploads/2023/06/puma-logo.svg" },
        { id: 4, name: "New Balance", logo: "https://logowik.com/content/uploads/2023/06/new-balance-logo.svg" },
      ],
      team: [
        {
          id: 1,
          firstName: "Marie",
          lastName: "Lefevre",
          role: "Responsable Style & Tendances",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          phone: "+33 6 12 34 56 78",
        },
        {
          id: 2,
          firstName: "Xavier",
          lastName: "Bernard",
          role: "Expert Fit & Confort",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          phone: "+33 6 98 76 54 32",
        },
        {
          id: 3,
          firstName: "Sophie",
          lastName: "Mercier",
          role: "Conseil Style Personnel",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          phone: "+33 6 11 22 33 44",
        },
      ],
      navLinks: [
        { label: "Accueil", to: "/" },
        { label: "Collections", to: "#categories" },
        { label: "Nouveautés", to: "#products" },
        { label: "Contact", to: "#contact" },
        { label: "Compte", to: "/login" },
      ],
      footer: {
        copyright: "© 2026 ShoeNiverse. Tous droits réservés.",
        socials: [
          { icon: "Instagram", url: "https://instagram.com/shoeniverse", label: "Instagram" },
          { icon: "Facebook", url: "https://facebook.com/shoeniverse", label: "Facebook" },
        ],
      },
    },
  }
}
```

---

## Exemple 2: Agence SaaS

Pour une agence SaaS (réservation, temps, tarification), adapter de la manière suivante:

```typescript
export const brandConfig = {
  siteMetadata: {
    title: "TaskFlow - Gestion de projet collaborative",
    description: "Collaborez, planifiez et délivrez ensemble. TaskFlow simplifie la gestion de projets.",
    locale: "fr_FR",
  },
  contact: {
    email: "support@taskflow.io",
    phone: "+33 1 85 64 52 18",
    address: "10 Rue de la Paix",
    city: "Paris",
    country: "France",
    zipCode: "75000",
    hours: "Lun-Ven: 09:00-18:00",
  },
  colors: {
    primary: "#8B5CF6",      // Purple
    secondary: "#6F3FF2",
    accent: "#EC4899",       // Rose
    dark: "#1F2937",
    surface: "#FFFFFF",
    textPrimary: "#1F2937",
    textMuted: "#6B7280",
  },
  sections: {
    showHero: true,
    showStats: true,
    showCategories: true,    // "Fonctionnalités"
    showFeaturedProducts: true,  // "Plans de tarification"
    showPartners: true,
    showTeam: true,
    showNewsletterBanner: true,  // À implémenter
    showFooter: true,
  },
  i18n: {
    fr: {
      brand: {
        name: "TaskFlow",
        tagline: "La collaboration simplifiée",
      },
      hero: {
        headline: "Gérez vos projets comme jamais",
        subheadline: "TaskFlow vous aide à organiser vos tâches, collaborer en temps réel et livrer avant les délais.",
        ctaLabel: "Essai gratuit 14 jours",
        ctaLink: "#pricing",
        secondaryCtaLabel: "Voir la démo",
        backgroundVideo: "/videos/saas-hero.mp4",
        backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      },
      ui: {
        categoriesTitle: "Fonctionnalités",
        productsTitle: "Plans de tarification",
        productsLink: "Voir tous les plans →",
        partnersTitle: "Aimé par les meilleures équipes",
        teamTitle: "Rencontrez notre équipe",
        teamSubtitle: "Des experts en collaboration et gestion de projets",
        quickLinks: "Ressources",
        contactUs: "Support",
      },
      categories: [
        {
          id: 1,
          label: "Gestion des tâches",
          icon: "CheckCircle",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          productIds: [],
        },
        {
          id: 2,
          label: "Collaboration temps réel",
          icon: "Users",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          productIds: [],
        },
        {
          id: 3,
          label: "Automatisation",
          icon: "Zap",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          productIds: [],
        },
        {
          id: 4,
          label: "Rapports & Analytics",
          icon: "BarChart3",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          productIds: [],
        },
      ],
      featuredProducts: [
        {
          id: 1,
          name: "Plan Starter",
          price: "29€/mois",
          badge: "Popular",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          categoryId: 1,
        },
        {
          id: 2,
          name: "Plan Pro",
          price: "79€/mois",
          badge: "Most Popular",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          categoryId: 1,
        },
        {
          id: 3,
          name: "Plan Enterprise",
          price: "Sur devis",
          badge: null,
          rating: 5.0,
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          categoryId: 1,
        },
      ],
      // ... (suite de la configuration)
    },
  }
}
```

---

## Exemple 3: Restaurant/Café

```typescript
export const brandConfig = {
  contact: {
    email: "bonjour@lecafe.fr",
    phone: "+33 2 XX XX XX XX",
    address: "123 Rue de la Boulangerie",
    city: "Lyon",
    country: "France",
    zipCode: "69000",
    hours: "Lun-Ven: 07h00-19h00 | Sam-Dim: 09h00-18h00",
  },
  colors: {
    primary: "#8B4513",      // Brown (café)
    secondary: "#D2B48C",    // Tan
    accent: "#F5DEB3",       // Wheat
    dark: "#3E2723",
    surface: "#FFFAF0",
    textPrimary: "#3E2723",
    textMuted: "#8B4513",
  },
  i18n: {
    fr: {
      brand: {
        name: "Le Café du Coin",
        tagline: "Votre havre de paix",
      },
      hero: {
        headline: "Bienvenue chez nous",
        subheadline: "Découvrez un univers de saveurs authentiques, de moments partagés et de détente.",
        ctaLabel: "Réserver une table",
        ctaLink: "#reservation",
        secondaryCtaLabel: "Voir le menu",
        backgroundImage: "https://images.unsplash.com/photo-1554118811-1e0d58224e24",
      },
      categories: [
        {
          id: 1,
          label: "Café",
          icon: "Coffee",
          image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad",
        },
        {
          id: 2,
          label: "Pâtisseries",
          icon: "Cake",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
        },
        {
          id: 3,
          label: "Petit-déj",
          icon: "Breakfast",
          image: "https://images.unsplash.com/photo-1495195134817-aeb325ef3c61",
        },
        {
          id: 4,
          label: "Déjeuner",
          icon: "UtensilsCrossed",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        },
      ],
      // ... (suite de la configuration)
    }
  }
}
```

---

## Exemple 4: Ajout d'une nouvelle section

### Cas: Ajouter une section "Témoignages clients"

#### Étape 1: Mettre à jour les types (`lib/types.ts`)

```typescript
export interface Translation {
  // ... propriétés existantes
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}
```

#### Étape 2: Ajouter les données (`app/config/brand.ts`)

```typescript
i18n: {
  fr: {
    testimonials: {
      title: "Ce que nos clients disent",
      subtitle: "Découvrez les témoignages de nos clients satisfaits",
      items: [
        {
          id: 1,
          text: "Produits de qualité exceptionnelle. Le service client est très réactif!",
          author: "Jean Dupont",
          role: "Constructeur indépendant",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          rating: 5,
        },
        {
          id: 2,
          text: "Les meilleurs prix du marché avec une livraison rapide.",
          author: "Marie Lefevre",
          role: "Architecte d'intérieur",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          rating: 5,
        },
        {
          id: 3,
          text: "Je récommande vivement! Parfait pour les gros chantiers.",
          author: "Thomas Martin",
          role: "Chef d'équipe BTP",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          rating: 4.8,
        },
      ],
    },
    // ... rest of the config
  }
}
```

#### Étape 3: Créer le composant (`components/TestimonialsSection.tsx`)

```typescript
'use client';
import { Star } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { SectionTitle } from './ui';

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionTitle>{t.testimonials.title}</SectionTitle>
          <p className="mt-4 text-lg text-gray-600">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[var(--color-accent)] text-[var(--color-accent)]"
                  />
                ))}
              </div>

              {/* Texte */}
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              {/* Auteur */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-[var(--color-dark)]">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

#### Étape 4: Utiliser le composant (`app/[lang]/page.tsx`)

```typescript
import TestimonialsSection from '@/components/TestimonialsSection';

export default function HomePage() {
  return (
    <>
      {/* Autres sections */}
      <TestimonialsSection />
      {/* ... */}
    </>
  );
}
```

**Résultat:** Une nouvelle section témoignages multilingue est disponible! 🎉

---

## 🚀 Checklist pour adapter le template

- [ ] Fork/cloner le repo
- [ ] Modifier `app/config/brand.ts`
- [ ] Tester en local: `npm run dev`
- [ ] Vérifier les deux langues
- [ ] Adapter les images
- [ ] Vérifier sur mobile
- [ ] Déployer sur Vercel
- [ ] Configurer le domaine personnalisé

---

**Besoin d'aide?** Consultez `TEMPLATE_GUIDE.md` et `ARCHITECTURE.md`.
