import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { brandConfig } from '@/app/config/brand';
import { Language } from '@/lib/types';

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params;

  // Validate language
  if (lang !== 'fr' && lang !== 'ar') {
    notFound();
  }

  const language = lang as Language;
  const t = brandConfig.i18n[language];

  const title = `${t.brand.name} - ${t.brand.tagline}`;
  const description = `${t.hero.subheadline} Découvrez notre gamme complète de matériaux de construction professionnels.`;

  return {
    title,
    description,
    keywords: [
      'matériaux construction',
      'céramique',
      'plomberie',
      'outillage',
      'BTP',
      'professionnels',
      language === 'ar' ? 'مواد بناء' : 'matériaux de construction',
      language === 'ar' ? 'سيراميك' : 'céramique',
      language === 'ar' ? 'خردوات' : 'quincaillerie',
    ],
    authors: [{ name: t.brand.name }],
    creator: t.brand.name,
    publisher: t.brand.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://batipro.fr'),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'fr-FR': '/fr',
        'ar-MA': '/ar',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://batipro.fr/${lang}`,
      siteName: t.brand.name,
      locale: language === 'fr' ? 'fr_FR' : 'ar_MA',
      type: 'website',
      images: [
        {
          url: t.hero.backgroundImage,
          width: 1200,
          height: 630,
          alt: `Logo ${t.brand.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [t.hero.backgroundImage],
      creator: '@batipro_fr',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-site-verification-code',
    },
  };
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  // Validate language
  if (lang !== 'fr' && lang !== 'ar') {
    notFound();
  }

  const language = lang as Language;
  const t = brandConfig.i18n[language];

  // Structured Data JSON-LD
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: t.brand.name,
    description: t.brand.tagline,
    url: `https://batipro.fr/${lang}`,
    logo: t.hero.backgroundImage,
    sameAs: [
      t.footer.socials[0]?.url || '#',
      t.footer.socials[1]?.url || '#',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-1-23-45-67-89',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: ['French', 'Arabic'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Zone Industrielle',
      addressLocality: 'Paris',
      postalCode: '75000',
      addressCountry: 'FR',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catalogue Produits',
      itemListElement: t.categories.map((category, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: category.label,
          category: category.label,
        },
      })),
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {children}
    </>
  );
}