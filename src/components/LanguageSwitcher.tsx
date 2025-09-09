'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { locales, languageNames } from '@/lib/translations';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (newLocale: string) => {
    if (!mounted) return;
    
    // Create new path by replacing the current locale
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale (first segment after /)
    const newPath = segments.join('/');
    
    router.push(newPath);
    setIsOpen(false);
  };

  // Don't render until component is mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 border rounded-md">
        <span>{languageNames[currentLocale] || currentLocale}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border rounded-md hover:bg-gray-50 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{languageNames[currentLocale] || currentLocale}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => changeLanguage(locale)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                  locale === currentLocale ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                }`}
                disabled={locale === currentLocale}
              >
                {languageNames[locale] || locale}
                {locale === currentLocale && (
                  <span className="ml-2">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}