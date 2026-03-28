'use client';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { Category } from '@/lib/types';
import { SectionTitle } from './ui/SectionTitle';

export default function CategoriesGrid() {
  const { t, language } = useLanguage();

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      BrickWall: Icons.BrickWall,
      Bath: Icons.Bath,
      Layers: Icons.Layers,
      Wrench: Icons.Wrench,
      Home: Icons.Home,
      Zap: Icons.Zap,
    };
    return iconMap[iconName] || Icons.Box;
  };

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>{t.ui.categoriesTitle}</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.categories.map((cat, idx) => {
            const IconComponent = getIconComponent(cat.icon);

            return (
              <Link key={cat.id} href={`/${language}/categories/${cat.id}`}>
                <div className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer bg-white transition-transform hover:scale-[1.01]">
                  <div className="aspect-w-4 aspect-h-3 h-64 w-full overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={`Image de la catégorie ${cat.label}`}
                      width={400}
                      height={300}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/90 via-[var(--color-dark)]/40 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-4">
                    <div className="p-3 bg-[var(--color-primary)] rounded-xl text-white shadow-lg transform transition-transform group-hover:-translate-y-2">
                      <IconComponent size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white transform transition-transform group-hover:-translate-y-1">
                      {cat.label}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
