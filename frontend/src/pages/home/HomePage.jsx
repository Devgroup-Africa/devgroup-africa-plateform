import { useEffect, useRef } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPostDate } from '../../api/formatters'
import { hydrateIcons } from '../../api/iconMap'
import { useApiResource } from '../../api/useApiResource'
import { CallToAction } from '../../components/common/CallToAction'
import { SectionTitle } from '../../components/common/SectionTitle'
import { CardGrid } from '../../components/content/CardGrid'
import { PostGrid } from '../../components/content/PostGrid'
import { ProjectGrid } from '../../components/content/ProjectGrid'
import { heroImages } from '../../data/assets'
import { posts, processSteps, projects, services } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'

const fallbackHome = {
  page: {
    sections: {
      hero: {
        eyebrow: 'Studio digital · Libreville',
        title: 'Le numérique qui fait avancer votre organisation.',
        highlight: 'avancer',
        text: 'Nous concevons des produits et services numériques simples, robustes et adaptés aux réalités de votre activité.',
        primaryCta: { label: 'Démarrer un projet', path: '/devis' },
        secondaryCta: { label: 'Voir nos réalisations', path: '/realisations' },
        trust: ['Stratégie', 'Design', 'Technologie', 'Accompagnement'],
        image: heroImages.team,
      },
      expertise: {
        eyebrow: 'Notre expertise',
        title: 'Un partenaire pour chaque étape de votre projet.',
        text: 'De la réflexion au déploiement, nous réunissons les compétences nécessaires pour construire des solutions qui fonctionnent.',
        link: '/services',
      },
      method: {
        eyebrow: 'Notre méthode',
        title: 'Simple dans l’approche. Exigeante dans l’exécution.',
        steps: processSteps,
      },
      projects: {
        eyebrow: 'Réalisations',
        title: 'Des solutions pensées pour le terrain.',
        text: 'Quelques exemples de produits numériques conçus pour répondre à des enjeux concrets.',
        link: '/realisations',
      },
      values: {
        eyebrow: 'Pourquoi DevGroup',
        title: 'La technologie n’est utile que lorsqu’elle sert vraiment les personnes.',
        items: [
          'Une compréhension fine de vos enjeux',
          'Des choix techniques durables',
          'Une collaboration claire et transparente',
          'Un accompagnement au-delà du lancement',
        ],
      },
      blog: {
        eyebrow: 'Perspectives',
        title: 'Nos dernières réflexions.',
        link: '/blog',
        linkLabel: 'Voir le blog',
      },
    },
  },
  services,
  projects,
  posts,
}

function normalizeHome(payload) {
  return {
    ...payload,
    services: hydrateIcons(payload.services || []),
    posts: (payload.posts || []).map(post => ({
      ...post,
      date: post.date || formatPostDate(post.publishedAt),
    })),
  }
}

function renderHighlightedTitle(title, highlight) {
  if (!highlight || !title.includes(highlight)) return title
  const [before, after] = title.split(highlight)
  return <>{before}<em>{highlight}</em>{after}</>
}

function useHomeAnimations() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealTargets = [
      ...root.querySelectorAll('.js-reveal'),
      ...root.querySelectorAll('.service-card, .process-card, .project-card, .value-list > div, .post-card, .cta-card'),
    ]

    revealTargets.forEach((target, index) => {
      target.classList.add('reveal')
      target.style.setProperty('--reveal-index', String(index % 6))
    })

    if (reduceMotion) {
      revealTargets.forEach(target => target.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' })

    revealTargets.forEach(target => observer.observe(target))

    let frame = 0
    const updateHeroShift = () => {
      frame = 0
      const shift = Math.min(window.scrollY * 0.08, 46)
      root.style.setProperty('--hero-shift', `${shift}px`)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateHeroShift)
    }

    updateHeroShift()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return rootRef
}

export function HomePage() {
  const homeRef = useHomeAnimations()
  const { data } = useApiResource('/public/home', fallbackHome, normalizeHome)
  const sections = data.page?.sections || fallbackHome.page.sections
  const hero = sections.hero

  return (
    <PublicLayout>
      <div className="home-animate" ref={homeRef}>
        <section className="hero home-hero" style={{ backgroundImage: `url("${hero.image || heroImages.team}")` }}>
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1>{renderHighlightedTitle(hero.title, hero.highlight)}</h1>
              <p>{hero.text}</p>
              <div className="hero-actions">
                <Link className="button" to={hero.primaryCta.path}>{hero.primaryCta.label} <ArrowRight size={17} /></Link>
                <Link className="button button-ghost" to={hero.secondaryCta.path}>{hero.secondaryCta.label}</Link>
              </div>
              <div className="hero-trust" aria-label="Expertises">
                <div className="hero-trust-track">
                  {[...hero.trust, ...hero.trust].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section js-reveal"><div className="container"><SectionTitle {...sections.expertise} /><CardGrid items={data.services} basePath="/services" limit={4} /></div></section>
        <section className="soft-section home-section js-reveal"><div className="container"><SectionTitle eyebrow={sections.method.eyebrow} title={sections.method.title} /><div className="process-grid">{sections.method.steps.map(step => <div className="process-card" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>
        <section className="home-section js-reveal"><div className="container"><SectionTitle {...sections.projects} /><ProjectGrid items={data.projects} /></div></section>
        <section className="dark-section home-section js-reveal"><div className="container split"><div><span className="eyebrow eyebrow-light">{sections.values.eyebrow}</span><h2>{sections.values.title}</h2></div><div className="value-list">{sections.values.items.map(value => <div key={value}><Check size={18} />{value}</div>)}</div></div></section>
        <section className="home-section js-reveal"><div className="container"><SectionTitle {...sections.blog} /><PostGrid items={data.posts} /></div></section>
        <CallToAction />
      </div>
    </PublicLayout>
  )
}
