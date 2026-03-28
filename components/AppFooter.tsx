'use client';
import { Hammer, Twitter, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

export default function AppFooter() {
  const { t, dir } = useLanguage();

  return (
    <footer id="footer" className="bg-[var(--color-dark)] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[var(--color-primary)] text-white">
                <Hammer size={24} />
              </div>
              <span className="font-bold text-2xl text-white">
                {t.brand.name}
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              {t.brand.tagline} {t.ui.contactUs}
            </p>
            <div className="flex gap-4">
              <a href={t.footer.socials[0].url} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href={t.footer.socials[1].url} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t.ui.quickLinks}</h3>
            <ul className="space-y-3">
              {t.navLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.to} className="hover:text-[var(--color-primary)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t.ui.categoriesTitle}</h3>
            <ul className="space-y-3">
              {t.categories.slice(0, 5).map((cat, idx) => (
                <li key={idx}>
                  <a href="#" className="hover:text-[var(--color-primary)] transition-colors">
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">{t.ui.contactUs}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[var(--color-primary)] shrink-0 mt-1" size={20} />
                <span>123 Zone Industrielle,<br />75000 Paris, France</span>
              </li>
              <li className="flex items-center gap-3" dir="ltr">
                <Phone className={`text-[var(--color-primary)] shrink-0 ${dir === 'rtl' ? 'ml-3' : ''}`} size={20} />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3" dir="ltr">
                <Mail className={`text-[var(--color-primary)] shrink-0 ${dir === 'rtl' ? 'ml-3' : ''}`} size={20} />
                <span>contact@batipro.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
