'use client';
import { ShoppingCart, Star } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Badge } from './ui/Badge';

export default function FeaturedProducts() {
  const { t, dir } = useLanguage();

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-dark)]">{t.ui.productsTitle}</h2>
            <div className="mt-2 w-24 h-1 bg-[var(--color-primary)] rounded-full"></div>
          </div>
          <a href="#" className="hidden sm:block text-[var(--color-primary)] font-medium hover:underline">
            {t.ui.productsLink}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                {product.badge && (
                  <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} z-10`}>
                    <Badge variant="accent">
                      {product.badge}
                    </Badge>
                  </div>
                )}
                <Image 
                  src={product.image} 
                  alt={`Image du produit ${product.name}`}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                />
              </div>
              
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={16} className="fill-[var(--color-accent)] text-[var(--color-accent)]" />
                  <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-dark)] mb-2 line-clamp-2">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-2xl font-extrabold text-[var(--color-primary)]" dir="ltr">{product.price}</span>
                  <button 
                    className="p-3 bg-gray-100 text-[var(--color-dark)] rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
                    aria-label={`Ajouter ${product.name} au panier`}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
