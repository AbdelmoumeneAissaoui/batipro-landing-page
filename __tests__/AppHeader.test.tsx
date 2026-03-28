import { render, screen } from '@testing-library/react';
import AppHeader from '@/components/AppHeader';
import { LanguageProvider } from '@/app/context/LanguageContext';

describe('AppHeader', () => {
  it('affiche le nom de la marque et le bouton de langue', () => {
    render(
      <LanguageProvider>
        <AppHeader />
      </LanguageProvider>
    );

    const brandName = screen.getByText(/Boukabes Céramique/i);
    const langButton = screen.getByRole('button', { name: /Changer la langue vers/i });

    expect(brandName).toBeInTheDocument();
    expect(langButton).toBeInTheDocument();
  });
});