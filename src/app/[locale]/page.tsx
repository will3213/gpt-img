import ImageGenerator from '@/components/ImageGenerator';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CookieConsent from '@/components/CookieConsent';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { getTranslation } from '@/lib/translations';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": getTranslation(locale, 'title'),
    "description": getTranslation(locale, 'description'),
    "url": `https://gptimagemini.online/${locale}`,
    "applicationCategory": "GraphicsApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Free AI image generation",
      "Text to image conversion",
      "No login required",
      "Multiple languages support"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              GPTImageMini
            </h1>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslation(locale, 'title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {getTranslation(locale, 'description')}
          </p>
        </div>

        <div className="flex justify-center">
          <ImageGenerator locale={locale} />
        </div>
      </main>

      <FAQ locale={locale} />

      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-sm text-gray-500">
              {getTranslation(locale, 'footer')} • Made with ❤️ for the community
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <Link href="/terms" className="hover:text-gray-600 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-gray-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <span>GDPR Compliant</span>
              <span>•</span>
              <span>© 2024 GPTImageMini</span>
            </div>
          </div>
        </div>
      </footer>
      
      <CookieConsent />
    </div>
  );
}
