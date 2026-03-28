import { render, screen } from '@testing-library/react';
import HeroSection from '@/components/HeroSection';
import { LanguageProvider } from '@/app/context/LanguageContext';

describe('HeroSection', () => {
  it('affiche le titre principal et les CTA', () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    const headline = screen.getByRole('heading', { level: 1 });
    const ctaButton = screen.getByRole('link', { name: /Voir le catalogue|عرض الكتالوج/i });

    expect(headline).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
  });
});