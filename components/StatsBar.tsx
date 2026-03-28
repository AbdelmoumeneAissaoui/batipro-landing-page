'use client';
import { useLanguage } from '@/app/context/LanguageContext';
import { Stat } from '@/lib/types';

export default function StatsBar() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-12 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {t.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm"
            >
              <div className="text-4xl font-extrabold text-[var(--color-primary)] mb-2">{stat.value}</div>
              <div className="text-[var(--color-text-muted)] font-medium uppercase tracking-wider text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
