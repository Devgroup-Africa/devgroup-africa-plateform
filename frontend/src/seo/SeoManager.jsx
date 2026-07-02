import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { posts, projects, services, solutions } from '../data/content'
import { simplePages } from '../data/simplePages'

const SITE_NAME = 'DevGroup Africa'
const DEFAULT_SITE_URL = 'https://devgroup.ga'
const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')
const defaultImage = `${siteUrl}/images/logo.png`

const staticPages = {
  '/': {
    title: 'Accueil | DevGroup Africa',
    description: 'DevGroup Africa conçoit des sites web, applications, plateformes metier et solutions numeriques pour les organisations en Afrique.',
    type: 'website',
  },
  '/services': {
    title: 'Services | DevGroup Africa',
    description: 'Developpement web, applications metier, UI/UX, intelligence artificielle, hebergement, maintenance et transformation numerique.',
  },
  '/solutions': {
    title: 'Solutions | DevGroup Africa',
    description: 'Portails entreprise, espaces clients, applications metier, e-commerce, automatisation et tableaux de bord adaptes a vos processus.',
  },
  '/realisations': {
    title: 'Realisations | DevGroup Africa',
    description: 'Decouvrez des plateformes, applications et produits numeriques conçus par DevGroup Africa pour repondre a des enjeux concrets.',
  },
  '/a-propos': {
    title: 'A propos | DevGroup Africa',
    description: 'DevGroup Africa accompagne les organisations dans la creation de produits numeriques utiles, solides et durables depuis Libreville.',
  },
  '/blog': {
    title: 'Blog | DevGroup Africa',
    description: 'Conseils, methodes et retours d experience pour mieux concevoir, piloter et faire evoluer vos projets numeriques.',
  },
  '/contact': {
    title: 'Contact | DevGroup Africa',
    description: 'Contactez DevGroup Africa pour discuter d un site web, d une application, d une plateforme metier ou d un projet digital.',
  },
  '/devis': {
    title: 'Devis | DevGroup Africa',
    description: 'Presentez votre besoin a DevGroup Africa et recevez un accompagnement pour cadrer votre prochain projet numerique.',
  },
}

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '')
}

function buildCanonical(pathname) {
  return `${siteUrl}${normalizePath(pathname) === '/' ? '' : normalizePath(pathname)}`
}

function buildImageUrl(image) {
  if (!image) return defaultImage
  if (/^https?:\/\//i.test(image)) return image
  return `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`
}

function textFromSimplePage(page) {
  const [section, title, description] = page
  return {
    title: `${title || section} | ${SITE_NAME}`,
    description: description || `${title || section} | ${SITE_NAME}`,
  }
}

function findDynamicSeo(pathname) {
  const path = normalizePath(pathname)
  const [, section, slug] = path.split('/')

  if (section === 'services' && slug) {
    const item = services.find(entry => entry.slug === slug)
    if (item) {
      return {
        title: `${item.title} | ${SITE_NAME}`,
        description: item.description,
        schemaType: 'Service',
        schemaName: item.title,
      }
    }
  }

  if (section === 'solutions' && slug) {
    const item = solutions.find(entry => entry.slug === slug)
    if (item) {
      return {
        title: `${item.title} | ${SITE_NAME}`,
        description: item.description,
        schemaType: 'Service',
        schemaName: item.title,
      }
    }
  }

  if (section === 'realisations' && slug) {
    const item = projects.find(entry => entry.slug === slug)
    if (item) {
      return {
        title: `${item.title} | ${SITE_NAME}`,
        description: item.description,
        schemaType: 'CreativeWork',
        schemaName: item.title,
      }
    }
  }

  if (section === 'blog' && slug && slug !== 'categorie') {
    const post = posts.find(entry => entry.slug === slug)
    if (post) {
      return {
        title: `${post.title} | ${SITE_NAME}`,
        description: post.description,
        type: 'article',
        image: buildImageUrl(post.coverImage),
        publishedTime: post.date,
        schemaType: 'Article',
        schemaName: post.title,
      }
    }
  }

  if (simplePages[section]) return textFromSimplePage(simplePages[section])

  return null
}

function resolveSeo(pathname) {
  const path = normalizePath(pathname)
  const isPrivate = path.startsWith('/admin')
  const page = staticPages[path] || findDynamicSeo(path)

  if (isPrivate) {
    return {
      title: `Administration | ${SITE_NAME}`,
      description: 'Espace prive DevGroup Africa.',
      robots: 'noindex,nofollow',
    }
  }

  return {
    title: page?.title || `Page introuvable | ${SITE_NAME}`,
    description: page?.description || 'Cette page DevGroup Africa est introuvable.',
    canonical: buildCanonical(path),
    image: page?.image || defaultImage,
    type: page?.type || 'website',
    robots: page ? 'index,follow' : 'noindex,follow',
    schemaType: page?.schemaType,
    schemaName: page?.schemaName,
  }
}

function setTag(selector, createTag, attributes) {
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = createTag()
    document.head.appendChild(tag)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    tag.setAttribute(key, value)
  })
}

function setMeta(name, content, attr = 'name') {
  setTag(`meta[${attr}="${name}"]`, () => {
    const tag = document.createElement('meta')
    tag.setAttribute(attr, name)
    return tag
  }, { content })
}

function setLink(rel, href) {
  setTag(`link[rel="${rel}"]`, () => {
    const tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    return tag
  }, { href })
}

function buildSchema(seo, pathname) {
  const canonical = seo.canonical || buildCanonical(pathname)
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl,
    logo: defaultImage,
    email: 'contact@devgroup.ga',
    telephone: '+241077383720',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Libreville',
      addressCountry: 'GA',
    },
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl,
  }

  const pageSchema = seo.schemaType
    ? {
      '@context': 'https://schema.org',
      '@type': seo.schemaType,
      name: seo.schemaName || seo.title,
      description: seo.description,
      url: canonical,
      provider: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: siteUrl,
      },
    }
    : {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: seo.title,
      description: seo.description,
      url: canonical,
    }

  return [organization, website, pageSchema]
}

function setJsonLd(seo, pathname) {
  const id = 'seo-json-ld'
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(buildSchema(seo, pathname))
}

export function SeoManager() {
  const location = useLocation()

  useEffect(() => {
    const seo = resolveSeo(location.pathname)
    const canonical = seo.canonical || buildCanonical(location.pathname)

    document.documentElement.lang = 'fr'
    document.title = seo.title

    setMeta('description', seo.description)
    setMeta('robots', seo.robots)
    setLink('canonical', canonical)

    setMeta('og:locale', 'fr_FR', 'property')
    setMeta('og:site_name', SITE_NAME, 'property')
    setMeta('og:title', seo.title, 'property')
    setMeta('og:description', seo.description, 'property')
    setMeta('og:type', seo.type, 'property')
    setMeta('og:url', canonical, 'property')
    setMeta('og:image', seo.image || defaultImage, 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', seo.title)
    setMeta('twitter:description', seo.description)
    setMeta('twitter:image', seo.image || defaultImage)

    setJsonLd(seo, location.pathname)
  }, [location.pathname])

  return null
}
