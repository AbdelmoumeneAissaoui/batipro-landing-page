import { notFound } from 'next/navigation';
import { brandConfig } from '@/app/config/brand';
import { Language } from '@/lib/types';
import AppHeader from '@/components/AppHeader';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import CategoriesGrid from '@/components/CategoriesGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import PartnersSection from '@/components/PartnersSection';
import TeamSection from '@/components/TeamSection';
import AppFooter from '@/components/AppFooter';

interface LangPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LangPage({ params }: LangPageProps) {
  const { lang } = await params;

  // Validate language
  if (lang !== 'fr' && lang !== 'ar') {
    notFound();
  }

  const { sections } = brandConfig;

  return (
    <main className="min-h-screen flex flex-col">
      <AppHeader />
      {sections.showHero && <HeroSection />}
      {sections.showStats && <StatsBar />}
      {sections.showCategories && <CategoriesGrid />}
      {sections.showFeaturedProducts && <FeaturedProducts />}
      {sections.showPartners && <PartnersSection />}
      {sections.showTeam && <TeamSection />}
      {sections.showFooter && <AppFooter />}
    </main>
  );
}