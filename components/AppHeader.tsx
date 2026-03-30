'use client';
import { ShoppingCart, Menu, Hammer, Globe } from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';

export default function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = () => {
    const targetLang = language === 'fr' ? 'ar' : 'fr';
    const stripPrefix = pathname.replace(/^\/(fr|ar)/, '');
    const normalizedPath = stripPrefix === '' ? '' : stripPrefix;

    setLanguage(targetLang);
    router.push(`/${targetLang}${normalizedPath}`);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    event.preventDefault();

    if (to === '/') {
      router.push(`/${language}`);
    } else if (to.startsWith('#')) {
      const targetElement = document.querySelector(to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/${language}`);
      }
    } else if (to.startsWith('/')) {
      router.push(to);
    } else {
      router.push(`/${language}${to}`);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg">
              <Image 
                src={t.hero.backgroundImage} 
                alt={`Logo ${t.brand.name}`}
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-[var(--color-dark)]">
              {t.brand.name}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {t.navLinks.map((link, idx) => {
              const href = link.to === '/' ? `/${language}` : link.to.startsWith('/') ? link.to : `/${language}${link.to}`;
              return (
                <a
                  key={idx}
                  href={href}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] font-medium transition-colors"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={changeLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-[var(--color-dark)] hover:bg-gray-200 transition-colors text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
              aria-label={`Changer la langue vers ${language === 'fr' ? 'Arabe' : 'Français'}`}
            >
              <Globe size={16} />
              {language === 'fr' ? 'عربي' : 'FR'}
            </button>
            <button 
              className="md:hidden p-2 text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {t.navLinks.map((link, idx) => {
              const href = link.to === '/' ? `/${language}` : link.to.startsWith('/') ? link.to : `/${language}${link.to}`;
              return (
                <a
                  key={idx}
                  href={href}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-gray-50"
                >
                  {link.label}
                </a>
              );
            })}
            <button 
              onClick={() => {
                changeLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-base font-medium text-[var(--color-dark)] bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
              aria-label={`Changer la langue vers ${language === 'fr' ? 'Arabe' : 'Français'}`}
            >
              <Globe size={16} />
              {language === 'fr' ? 'عربي' : 'FR'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
