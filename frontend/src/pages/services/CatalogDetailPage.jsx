import { ArrowRight, Check } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { hydrateIcon } from '../../api/iconMap'
import { useApiResource } from '../../api/useApiResource'
import { CallToAction } from '../../components/common/CallToAction'
import { services, solutions } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'
import { NotFoundPage } from '../NotFoundPage'

export function CatalogDetailPage({ type }) {
  const { slug } = useParams()
  const items = type === 'services' ? services : solutions
  const fallback = items.find(entry => entry.slug === slug)
  const { data: item, loading } = useApiResource(
    `/public/catalog/${type}/${slug}`,
    fallback,
    hydrateIcon,
  )

  if (!loading && !item) return <NotFoundPage />
  if (!item) return null

  const Icon = item.icon
  const bullets = item.details?.bullets || [
    'Cadrage précis de vos besoins',
    'Conception centrée utilisateurs',
    'Développement itératif et transparent',
    'Suivi après le lancement',
  ]

  return (
    <PublicLayout>
      <section className="detail-hero"><div className="container detail-grid">
        <div><Link className="back-link" to={`/${type}`}>← Retour aux {type}</Link><span className="icon-box icon-large"><Icon size={30} /></span><h1>{item.title}</h1><p>{item.description}</p><Link className="button" to="/devis">Parler de votre besoin <ArrowRight size={17} /></Link></div>
        <div className="detail-panel"><span>{item.details?.eyebrow || 'Notre approche'}</span><h2>{item.details?.title || 'Une solution utile aujourd’hui, prête pour demain.'}</h2><ul>{bullets.map(bullet => <li key={bullet}><Check size={18} />{bullet}</li>)}</ul></div>
      </div></section>
      <CallToAction />
    </PublicLayout>
  )
}
