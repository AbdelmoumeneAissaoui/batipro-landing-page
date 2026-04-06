# 🏗️ Architecture du Template Landing Page

## Vue d'ensemble

Le template est construit autour d'un concept simple mais puissant :
**Toute la configuration et le contenu du site est centralisé dans un seul fichier : `app/config/brand.ts`**

```
┌─────────────────────────────────────────────────────────────┐
│                    BRAND.TS (Configuration)                  │
│  - Contact info                                             │
│  - Couleurs                                                 │
│  - Contenu multilingue (FR/AR)                             │
│  - Images, vidéos, produits, équipe, et.c                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
         ┌────────────┴────────────┐
         │                         │
    ┌────▼─────────┐      ┌───────▼──────┐
    │ LanguageCtx  │      │ Components   │
    │ (multilingue)│      │ (consomment) │
    └──────────────┘      └──────────────┘
```

## Flow de données

```
brand.ts (source unique de vérité)
    ↓
LanguageContext.tsx (expose les données)
    ↓
Components (utilisent useLanguage())
    ↓
Page du navigateur
```

## Structure des fichiers clés

### 1. `app/config/brand.ts` - Configuration centralisée

**Contient:**
- `siteMetadata` - SEO, favicon, description
- `contact` - Email, phone, address (utilisé dans le footer)
- `colors` - Palette de couleurs (appliquée automatiquement via CSS variables)
- `sections` - Activer/désactiver les sections
- `i18n` - Contenu multilingue (FR/AR)

**Structure i18n.fr:**
```typescript
{
  brand: { name, tagline, logoImage? }
  hero: { headline, subheadline, ctaLabel, etc }
  ui: { Textes généraux des sections }
  contact: { Formulaire de contact }
  categories: Category[]
  featuredProducts: Product[]
  stats: Stat[]
  partners: Partner[]
  team: TeamMember[]
  navLinks: NavLink[]
  footer: { copyright, socials }
}
```

### 2. `lib/types.ts` - Définitions TypeScript

Définit les interfaces pour:
- `BrandConfig` - Structure complète de la config
- `Translation` - Structure du contenu multilingue
- `Category`, `Product`, `TeamMember`, etc

**Quand modifier:**
- Ajouter un nouveau type de donnée
- Ajouter une nouvelle propriété optionnelle ou requise

### 3. `app/context/LanguageContext.tsx` - Gestion du multilingue

Fournit:
- `language` - Langue actuelle (fr/ar)
- `setLanguage()` - Fonction pour changer de langue
- `t` - Traduction pour la langue actuelle
- `dir` - Direction du texte (ltr/rtl)

**Utilisation dans les composants:**
```typescript
const { t, language, setLanguage, dir } = useLanguage();
```

### 4. Composants principaux

Chaque composant suit le pattern:

```typescript
'use client';
import { useLanguage } from '@/app/context/LanguageContext';

export default function MyComponent() {
  const { t, dir } = useLanguage();

  return (
    <section>
      <h2>{t.ui.myTitle}</h2>
      {t.myData.map(item => (
        // Render
      ))}
    </section>
  );
}
```

**Composants existants:**
- `AppHeader.tsx` - Navigation (utilise `t.navLinks`, `t.brand.name`)
- `HeroSection.tsx` - Section principale (utilise `t.hero`)
- `CategoriesGrid.tsx` - Catégories (utilise `t.categories`)
- `FeaturedProducts.tsx` - Produits (utilise `t.featuredProducts`)
- `StatsBar.tsx` - Statistiques (utilise `t.stats`)
- `PartnersSection.tsx` - Partenaires (utilise `t.partners`)
- `TeamSection.tsx` - Équipe (utilise `t.team`)
- `AppFooter.tsx` - Footer (utilise `t.footer`, `brandConfig.contact`)

## Comment les données circulent

### Exemple: Changer le titre de la section Catégories

```
1. Modifier dans brand.ts:
   i18n.fr.ui.categoriesTitle = "Mes Catégories"

2. CategoriesGrid.tsx récupère via useLanguage():
   const { t } = useLanguage();
   → t.ui.categoriesTitle = "Mes Catégories"

3. Le composant affiche:
   <h2>{t.ui.categoriesTitle}</h2>
   → "Mes Catégories" s'affiche

4. L'utilisateur change la langue en arabe:
   setLanguage('ar')

5. LanguageContext récupère i18n.ar:
   → t.ui.categoriesTitle = "أقسامنا"

6. Le composant se re-rend automatiquement:
   <h2>أقسامنا</h2>
```

**Pas besoin de modifier le composant!** Les changements dans `brand.ts` sont automatiquement synchronisés.

## Flux de routing

```
/                → Redirige vers /fr (ou langue par défaut)
/fr              → Affiche la version française
/fr/categories   → Catégories en français
/ar              → Affiche la version arabe
/ar/categories   → Catégories en arabe
```

Les routes sont dynamiques grâce à `app/[lang]/` layout.

## CSS Variables

Les couleurs du `brand.ts` sont automatiquement disponibles comme variables CSS:

```css
background-color: var(--color-primary);
color: var(--color-text-primary);
border-color: var(--color-secondary);
```

**Implémentation** dans `LanguageContext.tsx`:
```typescript
const root = document.documentElement;
root.style.setProperty('--color-primary', colors.primary);
// Etc pour toutes les couleurs
```

## Fichiers à ne PAS modifier directement

### `data/products.json` ⚠️ DEPRECATED

**Ce fichier n'est plus utilisé.** Le contenu des produits est maintenant:
- Dans `app/config/brand.ts` → `i18n.fr.featuredProducts`
- Dans `app/config/brand.ts` → `i18n.ar.featuredProducts`

**Migration effectuée:**
Les produits étaient chargés depuis ce fichier JSON.
Maintenant, ils sont directement dans `brand.ts` pour une meilleure intégration.

### Pages qui utilisent la config

Les pages consomment automatiquement la config:
- `app/[lang]/page.tsx` - Page d'accueil
- `app/[lang]/categories/page.tsx` - Liste des catégories
- `app/[lang]/categories/[categoryId]/page.tsx` - Détail catégorie

## Performance

### Actualisation sans rechargement

`brand.ts` est importé une seule fois au build:
```typescript
import { brandConfig } from '@/app/config/brand';
```

Les changements en production nécessitent un redeploy.
En développement, le serveur recharge automatiquement.

### Optimisations

- ✅ Images lazy-loaded avec `next/image`
- ✅ CSS variables pour éviter les re-renders
- ✅ Composants client-side minimalistes
- ✅ Pas de bundle de données redundantes

## Ajouter une nouvelle section: Étapes

### 1. Définir le type (`lib/types.ts`)

```typescript
export interface Translation {
  // ... propriétés existantes
  myNewSection: {
    title: string;
    items: MyItem[];
  };
}

export interface MyItem {
  id: number;
  name: string;
}
```

### 2. Ajouter les données (`app/config/brand.ts`)

```typescript
i18n: {
  fr: {
    myNewSection: {
      title: "Mon titre",
      items: [{ id: 1, name: "Item 1" }],
    },
  },
}
```

### 3. Créer le composant (`components/MyNewSection.tsx`)

```typescript
'use client';
import { useLanguage } from '@/app/context/LanguageContext';
import { SectionTitle } from './ui';

export default function MyNewSection() {
  const { t } = useLanguage();

  return (
    <section>
      <SectionTitle>{t.myNewSection.title}</SectionTitle>
      {t.myNewSection.items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </section>
  );
}
```

### 4. Importer et utiliser (`app/[lang]/page.tsx`)

```typescript
import MyNewSection from '@/components/MyNewSection';

export default function HomePage() {
  return (
    <>
      {/* Autres sections */}
      <MyNewSection />
    </>
  );
}
```

## Debugging

### Les données ne s'affichent pas?

1. **Vérifier que le champ existe dans `brand.ts`**
   ```typescript
   // Est-ce que i18n.fr.myField existe?
   console.log(brandConfig.i18n.fr.myField);
   ```

2. **Vérifier que TypeScript compile**
   ```bash
   npm run build
   ```

3. **Vérifier que le composant utilise `useLanguage()`**
   ```typescript
   const { t } = useLanguage();
   ```

4. **Vérifier que le serveur dev est en cours d'exécution**
   ```bash
   npm run dev
   ```

### Les couleurs n'ont pas changé?

1. Redémarrer le serveur côté client (hard refresh: Ctrl+Shift+R)
2. Vérifier que les classes utilisent `var(--color-*)` et non des couleurs hardcodées
3. Vérifier que le hook `useLanguage()` est dans un composant `'use client'`

---

## 🎯 Résumé

| Besoin | Où faire | Fichier |
|--------|----------|---------|
| Changer le contenu | Modifier les données | `app/config/brand.ts` |
| Changer la structure | Modifier les types | `lib/types.ts` |
| Changer la langue | Ajouter dans `i18n` | `app/config/brand.ts` |
| Ajouter une section | Créer un composant | `components/MySection.tsx` |
| Activer/désactiver sections | Modifier `sections` | `app/config/brand.ts` |
| Changer les couleurs | Modifier `colors` | `app/config/brand.ts` |

---

**Conseil:** Consultez `TEMPLATE_GUIDE.md` pour des exemples pratiques et des cas d'usage complets.
