import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles
import { brandConfig } from './config/brand';
import { LanguageProvider } from './context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BatiPro - Matériaux de Construction',
  description: 'Matériaux de construction, sanitaire, céramique et équipement professionnel.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (typeof window !== 'undefined') {
                  const originalFetch = window.fetch;
                  Object.defineProperty(window, 'fetch', {
                    value: originalFetch,
                    writable: true,
                    configurable: true,
                    enumerable: true
                  });
                }
              } catch (e) {
                console.error('Failed to patch fetch:', e);
              }
            `,
          }}
        />
        <style>{`
          :root {
            --color-primary: ${brandConfig.colors.primary};
            --color-secondary: ${brandConfig.colors.secondary};
            --color-accent: ${brandConfig.colors.accent};
            --color-dark: ${brandConfig.colors.dark};
            --color-surface: ${brandConfig.colors.surface};
            --color-text-primary: ${brandConfig.colors.textPrimary};
            --color-text-muted: ${brandConfig.colors.textMuted};
          }
        `}</style>
      </head>
      <body className={`${inter.className} bg-gray-50 text-[var(--color-text-primary)]`} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
