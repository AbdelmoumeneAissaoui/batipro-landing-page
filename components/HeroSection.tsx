'use client';
import { useLanguage } from '@/app/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  const { hero } = t;

  return (
    <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video/Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {hero.backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={hero.backgroundImage}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Fallback to background image if video fails to load
              const target = e.target as HTMLVideoElement;
              target.style.display = 'none';
            }}
          >
            <source src={hero.backgroundVideo} type="video/mp4" />
            {/* Fallback content */}
            Votre navigateur ne supporte pas la vidéo.
          </video>
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-[var(--color-dark)]/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">{hero.headline}</h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10">{hero.subheadline}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href={hero.ctaLink}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-white bg-[var(--color-primary)] hover:bg-orange-700 transition-colors shadow-lg"
          >
            {hero.ctaLabel}
          </a>
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-[var(--color-dark)] bg-white hover:bg-gray-100 transition-colors shadow-lg"
          >
            {hero.secondaryCtaLabel}
          </a>
        </div>
      </div>

      {/* Diagonal Cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
    </section>
  );
}
