import { hydrateIcons } from '../../api/iconMap'
import { useApiResource } from '../../api/useApiResource'
import { CallToAction } from '../../components/common/CallToAction'
import { PageHero } from '../../components/common/PageHero'
import { CardGrid } from '../../components/content/CardGrid'
import { services, solutions } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'

export function CatalogPage({ type }) {
  const isServices = type === 'services'
  const fallback = isServices ? services : solutions
  const { data: items } = useApiResource(`/public/catalog/${type}`, fallback, hydrateIcons)

  return (
    <PublicLayout>
      <PageHero
        eyebrow={isServices ? 'Nos services' : 'Nos solutions'}
        title={isServices ? 'Des expertises réunies pour faire avancer vos projets.' : 'Des outils numériques conçus autour de votre activité.'}
        text={isServices ? 'Nous intervenons de la stratégie à la maintenance pour créer des produits numériques solides.' : 'Nous adaptons chaque solution à vos processus, vos équipes et vos utilisateurs.'}
      />
      <section><div className="container"><CardGrid items={items} basePath={`/${type}`} /></div></section>
      <CallToAction />
    </PublicLayout>
  )
}
