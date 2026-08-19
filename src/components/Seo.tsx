import { useEffect } from 'react'
import { useLanguage } from '@/i18n/LanguageContext'

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Sets document title + meta description/OG tags per page. No extra deps — plain DOM writes on mount. */
export default function Seo({ title, description }: { title: string; description?: string }) {
  const { t } = useLanguage()

  useEffect(() => {
    const siteName = t('meta.siteName')
    const fullTitle = title ? `${title} — ${siteName}` : siteName
    document.title = fullTitle

    const desc = description || t('meta.tagline')
    setMeta('description', desc)
    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', desc, 'property')
  }, [title, description, t])

  return null
}
