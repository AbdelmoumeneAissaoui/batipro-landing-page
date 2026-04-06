<div align="center">
  <h1>🏗️ Template Landing Page Modularisé</h1>
  <p><strong>BatiPro</strong> - Template landing page adaptable et multilingue (FR/AR)</p>
  <p>
    <a href="#démarrage-rapide">Démarrage Rapide</a> •
    <a href="#structure">Structure</a> •
    <a href="#configuration">Configuration</a> •
    <a href="#déploiement">Déploiement</a>
  </p>
</div>

---

## 🎯 À propos

Ce template est conçu pour créer rapidement des **landing pages professionnelles** pour des projets B2B/B2C. Les principales caractéristiques :

✨ **Avantages**
- ✅ **Configuration centralisée** - Tout le contenu dans un seul fichier (`brand.ts`)
- ✅ **Multilingue** - Support FR/AR intégré (facile d'ajouter d'autres langues)
- ✅ **Design professionnel** - Composants modernes avec Tailwind CSS
- ✅ **Adapté pour les ventes** - Sections héros, produits, équipe, partenaires, stats
- ✅ **Mobile-first** - Responsive design
- ✅ **TypeScript** - Code type-safe
- ✅ **Performance** - Next.js 15+ avec optimisations intégrées

## 🚀 Démarrage Rapide

### Prerequisites
- **Node.js** 18+ (recommandé 20+)
- **npm** ou **yarn**

### Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd batipro-landing-page

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir le résultat.

### Première adaptation (5 min)

1. Ouvrir `app/config/brand.ts`
2. Modifier les infos dans la section `contact` (email, phone, address)
3. Changer les couleurs dans la section `colors`
4. Adapter le contenu multilingue dans la section `i18n`
5. Rafraîchir le navigateur

✅ **C'est fait!** Votre site est adapté.

---

## 🏗️ Structure

```
batipro-landing-page/
├── app/
│   ├── config/
│   │   └── brand.ts                    ← 🎯 TOUT LE CONTENU EST ICI
│   ├── context/
│   │   └── LanguageContext.tsx         ← Gestion du multilingue
│   ├── [lang]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    ← Page principale
│   │   └── categories/                 ← Pages dynamiques
│   └── api/                            ← API routes (admin)
├── components/                          ← Composants réutilisables
│   ├── AppHeader.tsx                   ← Navigation
│   ├── HeroSection.tsx                 ← Section héros
│   ├── CategoriesGrid.tsx              ← Grille catégories
│   ├── FeaturedProducts.tsx            ← Produits mis en avant
│   ├── PartnersSection.tsx             ← Nos partenaires
│   ├── TeamSection.tsx                 ← Notre équipe
│   ├── StatsBar.tsx                    ← Statistiques
│   ├── AppFooter.tsx                   ← Pied de page
│   └── ui/                             ← Composants UI génériques
├── lib/
│   ├── types.ts                        ← Définitions TypeScript
│   ├── data.ts                         ← Utilitaires
│   └── auth.ts                         ← Authentification admin
├── public/                              ← Fichiers statiques
│   └── videos/
├── data/                                ← (Deprecated: utiliser brand.ts)
│   └── products.json
├── TEMPLATE_GUIDE.md                   ← 📖 Guide complet d'adaptation
└── package.json

```

### 🔑 Fichier central: `app/config/brand.ts`

Ce fichier contient :
- **Métadonnées** du site (SEO, favicon)
- **Infos de contact** (utilisées partout)
- **Palette de couleurs**
- **Contenu multilingue** (FR/AR) :
  - Textes (hero, catégories, produits, etc)
  - Images et vidéos
  - Équipe et partenaires
  - Navigation et footer

**Concept**: Modifier ce fichier = modifier le site entier!

---

## ⚙️ Configuration

### Variables d'environnement

Créer `.env.local`:

```env
NEXT_PUBLIC_BRAND_NAME=Votre Marque
NEXT_PUBLIC_CONTACT_EMAIL=contact@votresite.fr
```

### Personnaliser les couleurs

Dans `app/config/brand.ts`:

```typescript
colors: {
  primary: "#003CE8",      // Couleur principale (boutons)
  secondary: "#1e293b",    // Couleur secondaire
  accent: "#bd3b07",       // Badges, points d'accent
  dark: "#0f172a",         // Texte/fond sombre
  surface: "#ffffff",      // Fond blanc
  textPrimary: "#0f172a",  // Texte principal
  textMuted: "#0046a8",    // Texte discret
},
```

### Personnaliser le contenu

#### Pour le français:
```typescript
i18n: {
  fr: {
    brand: {
      name: "Votre Marque",
      tagline: "Votre slogan",
    },
    hero: {
      headline: "Titre accrocheur",
      subheadline: "Description",
      // ...
    },
    // ...
  },
}
```

#### Pour l'arabe:
Même structure dans `i18n.ar`

---

## 🌍 Multilingue

Le site supporte automatiquement :
- `/fr` - Version française
- `/ar` - Version arabe

Pour ajouter une langue (ex: anglais):

1. Ajouter le type: `export type Language = 'fr' | 'ar' | 'en';`
2. Ajouter dans `brand.ts`: `i18n.en = { ... }`

---

## 🔨 Scripts disponibles

```bash
# Développement
npm run dev              # Lancer serveur local (http://localhost:3000)

# Production
npm run build            # Build pour production
npm start                # Lancer serveur de production

# Maintenance
npm run lint             # Vérifier la syntaxe ESLint
npm test                 # Lancer les tests Jest
npm run test:watch      # Tests en mode watch
npm run clean           # Nettoyer le build

```

---

## 📱 Sections disponibles

Le template inclut les sections suivantes (activables/désactivables dans `brand.ts`):

| Section | Contrôle | Description |
|---------|----------|-------------|
| Hero | `showHero` | Image/vidéo de fond + CTA |
| Statistiques | `showStats` | Chiffres clés (clients, produits, etc) |
| Catégories | `showCategories` | Grille de catégories avec icônes |
| Produits | `showFeaturedProducts` | Produits mis en avant |
| Partenaires | `showPartners` | Logos des partenaires |
| Équipe | `showTeam` | Fiche avec photo, rôle, coordonnées |
| Brèves | `showNewsletterBanner` | À implémenter |
| Footer | `showFooter` | Pied de page avec contact |

Activez/désactivez dans `sections`:
```typescript
sections: {
  showHero: true,
  showStats: true,
  // ...
}
```

---

## 🎨 Customisation avancée

Pour des changements plus profonds, voir [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) qui explique :

- ✅ Ajouter des sections personnalisées
- ✅ Modifier les types TypeScript
- ✅ Créer de nouveaux composants
- ✅ Gérer les images et médias
- ✅ Configurer l'authentification admin

---

## 🚀 Déploiement

### Sur Vercel (recommandé - **GRATUIT**)

1. Pousser votre code sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
3. Importer votre repo
4. Vercel déploie automatiquement 🎉

```bash
git push origin main
# Vercel déploie automatiquement
```

### Sur une autre plateforme

```bash
# Build production
npm run build

# Tester localement
npm start

# Déployer les fichiers `/out` sur votre serveur
```

---

## 📖 Documentation

- **[TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md)** - Guide complet d'adaptation ⭐
- **[Lucide Icons](https://lucide.dev)** - Icônes disponibles
- **[Next.js](https://nextjs.org/docs)** - Documentation du framework
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Styles

---

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Lancer en mode watch
npm run test:watch

# Couvrir les tests
npm test -- --coverage
```

---

## 📧 Contact & Support

Pour des questions ou améliorations:
1. Consulter la documentation dans `TEMPLATE_GUIDE.md`
2. Vérifier les examples existants dans les composants
3. Lire la code source avec les commentaires

---

## 📄 Licence

Ce projet est à usage interne. Modification et distribution autorisées selon les besoins.

---

## 🙏 Crédits

Construit avec :
- **Next.js** - Framework React
- **Tailwind CSS** - Styles
- **Lucide React** - Icônes
- **TypeScript** - Type-safety

---

<div align="center">
  <p><strong>Heureux développement! 🚀</strong></p>
  <p>Pour adapter le template, consultez <a href="./TEMPLATE_GUIDE.md">TEMPLATE_GUIDE.md</a></p>
</div>
