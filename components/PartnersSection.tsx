'use client';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { Partner } from '@/lib/types';
import { SectionTitle } from './ui';

export default function PartnersSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle className="mb-12">
          {t.ui.partnersTitle}
        </SectionTitle>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {t.partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Image 
                src={partner.logo} 
                alt={`Logo de ${partner.name}`}
                width={200}
                height={100}
                className="h-16 md:h-20 object-contain"
                title={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
