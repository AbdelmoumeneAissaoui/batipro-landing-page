import { notFound } from 'next/navigation';
import Image from 'next/image';
import { brandConfig } from '@/app/config/brand';
import { Language, Product, Category } from '@/lib/types';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import { Card } from '@/components/ui/Card';

interface CategoryDetailPageProps {
  params: Promise<{
    lang: Language;
    categoryId: string;
  }>;
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { lang, categoryId } = await params;
  const translation = brandConfig.i18n[lang];

  const category = translation.categories.find((cat) => String(cat.id) === categoryId);
  if (!category) {
    notFound();
  }

  const selectedProductIds = category?.productIds ?? [];
  const products = selectedProductIds.length
    ? translation.featuredProducts.filter((product) => selectedProductIds.includes(product.id))
    : translation.featuredProducts.filter((product) => product.name.toLowerCase().includes(category.label.toLowerCase()));

  return (
    <main className={`min-h-screen bg-slate-50 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <AppHeader />

      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{category.label}</h1>
          <p className="mb-8 text-gray-600">{translation.ui.productsTitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} className="p-4 hover:shadow-xl" hover>
                  <div className="h-44 relative mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">{product.price}</p>
                  {product.badge && <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">{product.badge}</span>}
                </Card>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-600">Aucun produit référencé pour cette catégorie.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <AppFooter />
    </main>
  );
}
