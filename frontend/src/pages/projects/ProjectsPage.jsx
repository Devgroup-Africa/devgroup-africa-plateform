import { useApiResource } from '../../api/useApiResource'
import { CallToAction } from '../../components/common/CallToAction'
import { PageHero } from '../../components/common/PageHero'
import { ProjectGrid } from '../../components/content/ProjectGrid'
import { projects } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'

export function ProjectsPage() {
  const { data: items } = useApiResource('/public/projects', projects)

  return <PublicLayout><PageHero eyebrow="Nos réalisations" title="Des produits numériques qui répondent à de vrais enjeux." text="Découvrez une sélection de solutions créées avec nos partenaires." /><section><div className="container"><ProjectGrid items={items} /></div></section><CallToAction /></PublicLayout>
}
