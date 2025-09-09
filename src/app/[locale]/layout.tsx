import type { Metadata } from "next";
import { getTranslation } from '@/lib/translations';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params;
  
  const title = getTranslation(locale, 'title');
  const description = getTranslation(locale, 'description');
  const keywords = getTranslation(locale, 'keywords');
  
  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: 'GPTImageMini' }],
    creator: 'GPTImageMini',
    publisher: 'GPTImageMini',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://gptimagemini.online'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'zh-CN': '/zh',
        'ja-JP': '/ja',
        'ko-KR': '/ko',
        'de-DE': '/de',
        'es-ES': '/es',
        'fr-FR': '/fr',
        'it-IT': '/it',
        'pt-PT': '/pt',
        'vi-VN': '/vi',
        'tr-TR': '/tr',
        'ar-SA': '/ar',
        'th-TH': '/th',
        'hi-IN': '/hi',
      },
    },
    openGraph: {
      title: title,
      description: description,
      type: 'website',
      locale: locale,
      url: `https://gptimagemini.online/${locale}`,
      siteName: 'GPTImageMini',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
 
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}