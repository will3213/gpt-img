import { MetadataRoute } from 'next'
import { locales } from '@/lib/translations'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gptimagemini.online'
  
  // Main language routes
  const routes = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }))

  // Global legal pages (no language prefix)
  const legalRoutes = [
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...routes,
    ...legalRoutes,
  ]
}