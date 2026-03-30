'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { brandConfig } from '@/app/config/brand';
import { Language, LanguageContextType, Translation } from '@/lib/types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const isBrowser = typeof window !== 'undefined';
  const [language, setLanguage] = useState<Language>(() => {
    if (!isBrowser) return 'fr';
    const savedLang = localStorage.getItem('app_lang') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'ar')) {
      return savedLang;
    }
    return 'fr';
  });
  const [mounted, setMounted] = useState<boolean>(isBrowser);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem('app_lang', language);
    }
  }, [language, mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-gray-50" />;
  }

  const t = brandConfig.i18n[language];
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
