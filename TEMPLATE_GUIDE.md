# 🎨 Guide d'Adaptation - Template Landing Page Modularisé

Ce template a été conçu pour être **facilement adaptable** à différents projets de landing page B2B/B2C. Toute la configuration et le contenu du site est centralisé dans un **seul fichier**: `app/config/brand.ts`

## 📋 Table des matières

1. [Structure du projet](#structure-du-projet)
2. [Configuration rapide](#configuration-rapide)
3. [Personnalisation complète](#personnalisation-complète)
4. [Ajouter de nouvelles sections](#ajouter-de-nouvelles-sections)
5. [Multilingue](#multilingue)
6. [Déploiement](#déploiement)

---

## 🏗️ Structure du projet

```
app/
  config/
    brand.ts          ← 🎯 FICHIER PRINCIPAL (tout le contenu ici!)
  context/
    LanguageContext.tsx
  [lang]/
    layout.tsx
    page.tsx
components/
  AppHeader.tsx
  HeroSection.tsx
  CategoriesGrid.tsx
  FeaturedProducts.tsx
  PartnersSection.tsx
  TeamSection.tsx
  StatsBar.tsx
  AppFooter.tsx
lib/
  types.ts          ← Types TypeScript (modifiez si besoin de nouvelles propriétés)
```

### 🔑 Concept clé
**Tous les changements de contenu se font UNIQUEMENT dans `app/config/brand.ts`**
Les composants utilisent les données de ce fichier via le contexte de langue.

---

## ⚡ Configuration rapide (5 minutes)

Pour adapter le template à votre projet :

### 1. **Modifier les infos de contact**

```typescript
// app/config/brand.ts
export const brandConfig: BrandConfig = {
  contact: {
    email: "votre-email@votresite.fr",
    phone: "+33 X XX XX XX XX",
    address: "123 Votre Adresse",
    city: "Votre Ville",
    country: "France",
    zipCode: "75000",
    hours: "Lun-Ven: 08:00-18:00",
  },
  // ...
}
```

### 2. **Changer la palette de couleurs**

```typescript
colors: {
  primary: "#003CE8",      // Couleur principale (boutons, etc)
  secondary: "#1e293b",    // Couleur secondaire
  accent: "#bd3b07",       // Couleur d'accent (badges, etc)
  dark: "#0f172a",         // Texte/fond sombre
  surface: "#ffffff",      // Fond blanc
  textPrimary: "#0f172a",  // Texte principal
  textMuted: "#0046a8",    // Texte muted
},
```

💡 **Astuce**: Utilisez un outil comme [Coolors.co](https://coolors.co) pour générer des palettes harmonielles.

### 3. **Activer/Désactiver les sections**

```typescript
sections: {
  showHero: true,
  showStats: true,
  showCategories: true,
  showFeaturedProducts: true,
  showPartners: true,
  showTeam: true,
  showNewsletterBanner: false,  // À implémenter
  showFooter: true,
},
```

### 4. **Métadonnées du site (SEO)**

```typescript
siteMetadata: {
  title: "Votre titre | Votre marque",
  description: "Description concise de votre site pour les moteurs de recherche",
  favicon: "/favicon.ico",
  ogImage: "https://url-de-votre-image-pour-partages-sociaux.jpg",
  locale: "fr_FR",
},
```

---

## 🎯 Personnalisation complète

### Contenu multilingue

Le fichier `brand.ts` supporte plusieurs langues dans la section `i18n`:

```typescript
i18n: {
  fr: { /* Contenu en français */ },
  ar: { /* Contenu en arabe */ },
  // Pouvez ajouter d'autres langues (en, es, etc)
}
```

Chaque langue contient :

#### **Section Brand**
```typescript
brand: {
  name: "Votre Marque",
  tagline: "Votre slogan",
  logoImage: "/logo.png",
}
```

#### **Section Hero (Hero Section)**
```typescript
hero: {
  headline: "Titre accrocheur",
  subheadline: "Sous-titre / description",
  ctaLabel: "Texte du bouton principal",
  ctaLink: "#categories",
  secondaryCtaLabel: "Texte du 2e bouton",
  backgroundVideo: "/videos/hero.mp4",
  backgroundImage: "https://...",
}
```

#### **Section UI (Textes généraux)**
```typescript
ui: {
  categoriesTitle: "Nos Rayons",
  productsTitle: "Produits à la Une",
  productsLink: "Voir tout le catalogue →",
  partnersTitle: "Ils nous font confiance",
  teamTitle: "Notre Équipe",
  teamSubtitle: "Description",
  quickLinks: "Liens Rapides",
  contactUs: "Contact",
  legal: "Mentions Légales",
  cgv: "Conditions Générales",
  securePayment: "Paiement sécurisé",
  fastDelivery: "Livraison rapide",
}
```

#### **Catégories**
```typescript
categories: [
  {
    id: 1,
    label: "Nom de la catégorie",
    icon: "BrickWall",  // Icône Lucide React
    image: "https://...",
    productIds: [1, 2, 3]  // IDs des produits
  },
  // ...
]
```

**Icônes disponibles** (de Lucide React):
- `BrickWall`, `Bath`, `Layers`, `Wrench`, `Home`, `Zap`, `ShoppingCart`, `Star`, etc.
- [Voir toutes les icônes](https://lucide.dev)

#### **Produits à la Une**
```typescript
featuredProducts: [
  {
    id: 1,
    name: "Nom du produit",
    price: "99.99€",
    badge: "Promo",  // ou null
    rating: 4.8,
    image: "https://...",
    categoryId: 1,
  },
  // ...
]
```

#### **Statistiques**
```typescript
stats: [
  { value: "15K+", label: "Clients satisfaits" },
  { value: "50K+", label: "Produits" },
  { value: "98%", label: "Taux de satisfaction" },
]
```

#### **Partenaires**
```typescript
partners: [
  {
    id: 1,
    name: "Nom du partenaire",
    logo: "https://...",
  },
  // ...
]
```

#### **Équipe**
```typescript
team: [
  {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    role: "Directeur Commercial",
    avatar: "https://...",
    phone: "+33 6 12 34 56 78",
  },
  // ...
]
```

#### **Navigation**
```typescript
navLinks: [
  { label: "Accueil", to: "/" },
  { label: "Catégories", to: "#categories" },
  { label: "Produits", to: "#products" },
  { label: "Contact", to: "#contact" },
  { label: "Admin", to: "/admin" },
]
```

#### **Footer**
```typescript
footer: {
  copyright: "© 2026 Votre Marque. Tous droits réservés.",
  socials: [
    { icon: "Instagram", url: "https://...", label: "Instagram" },
    { icon: "Facebook", url: "https://...", label: "Facebook" },
  ],
}
```

---

## ➕ Ajouter de nouvelles sections

Pour ajouter une nouvelle section (ex: Newsletter, Testimonials) :

### 1. **Ajouter le type dans `lib/types.ts`**

```typescript
export interface Translation {
  // ... propriétés existantes
  myNewSection: {
    title: string;
    description: string;
    items: MyItem[];
  };
}

export interface MyItem {
  id: number;
  name: string;
  // ...
}
```

### 2. **Ajouter le contenu dans `brand.ts`**

```typescript
i18n: {
  fr: {
    myNewSection: {
      title: "Ma nouvelle section",
      description: "Description",
      items: [
        { id: 1, name: "Item 1" },
        // ...
      ],
    },
  },
  ar: {
    // Même structure en arabe
  },
}
```

### 3. **Créer le composant**

```typescript
// components/MyNewSection.tsx
'use client';
import { useLanguage } from '@/app/context/LanguageContext';

export default function MyNewSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2>{t.myNewSection.title}</h2>
        {/* Votre contenu */}
      </div>
    </section>
  );
}
```

### 4. **Ajouter à la page**

```typescript
// app/[lang]/page.tsx
import MyNewSection from '@/components/MyNewSection';
import { brandConfig } from '@/app/config/brand';

export default function HomePage() {
  const { showMyNewSection } = brandConfig.sections;

  return (
    <>
      {/* Autres sections */}
      {showMyNewSection && <MyNewSection />}
      {/* ... */}
    </>
  );
}
```

---

## 🌍 Multilingue

### Ajouter une nouvelle langue

1. **Ajouter dans `lib/types.ts`** (si nécessaire):
```typescript
export type Language = 'fr' | 'ar' | 'en'; // Ajoutez 'en'
```

2. **Ajouter dans `app/config/brand.ts`**:
```typescript
i18n: {
  fr: { /* ... */ },
  ar: { /* ... */ },
  en: { /* Copier la structure du français et traduire */ },
}
```

3. **La route est automatique** : `/en`, `/fr`, `/ar` seront disponibles

---

## 📱 Variables CSS pour les couleurs

Les couleurs sont automatiquement disponibles comme variables CSS grâce au `LanguageContext`:

```css
background-color: var(--color-primary);
color: var(--color-text-primary);
border: 1px solid var(--color-secondary);
```

Vérifiez dans `app/context/LanguageContext.tsx` pour voir comment c'est implémenté.

---

## 🚀 Déploiement

### Sur Vercel (recommandé)

```bash
# 1. Installer les dépendances
npm install

# 2. Vérifier que tout fonctionne
npm run build

# 3. Déployer sur Vercel
# Connectez votre repo GitHub à Vercel.com et push
git push origin main
```

### Variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_BRAND_NAME=Votre Marque
NEXT_PUBLIC_CONTACT_EMAIL=contact@votresite.fr
```

---

## ✅ Checklist d'adaptation

- [ ] Modifier les infos de contact dans `app/config/brand.ts`
- [ ] Changer la palette de couleurs
- [ ] Mettre à jour les métadonnées (SEO)
- [ ] Remplacer le logo et les images
- [ ] Adapter le contenu textuel (heroheadline, categories, etc)
- [ ] Configurer les partenaires et équipe
- [ ] Ajouter les liens sociaux
- [ ] Tester sur mobile
- [ ] Vérifier les deux langues (FR/AR)
- [ ] Déployer sur Vercel

---

## 🐛 Troubleshooting

### Les changements dans `brand.ts` ne s'affichent pas
→ Redémarrez le serveur: `npm run dev`

### Les icônes ne s'affichent pas
→ Vérifiez le nom exact de l'icône Lucide React dans [la doc](https://lucide.dev)

### Le multilingue ne fonctionne pas
→ Vérifiez que la langue existe dans `i18n` et dans le type `Language`

### Les couleurs CSS ne s'appliquent pas
→ Vérifiez que le `LanguageContext` exporte correctement les couleurs

---

## 📞 Support & Questions

Pour toute question ou problème :
1. Consultez le code des composants existants
2. Vérifiez que tous les champs requis sont remplis dans `brand.ts`
3. Testez en local avant de déployer

**Bon développement! 🚀**
