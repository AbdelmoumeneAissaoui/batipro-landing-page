import Link from 'next/link';
import { brandConfig } from '@/app/config/brand';
import { Language, Translation } from '@/lib/types';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

interface CategoriesPageProps {
  params: Promise<{
    lang: Language;
  }>;
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { lang } = await params;
  const translation: Translation = brandConfig.i18n[lang];

  return (
    <main className={`min-h-screen bg-white ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <AppHeader />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{translation.ui.categoriesTitle}</h1>
          <p className="text-gray-600 mb-8">{translation.ui.teamSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {translation.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${lang}/categories/${cat.id}`}
                className="block rounded-2xl border border-gray-200 p-5 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={cat.image} alt={cat.label} className="h-16 w-16 object-cover rounded-lg" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{cat.label}</h2>
                    <p className="text-gray-500">{cat.productIds?.length ?? 0} produits</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
