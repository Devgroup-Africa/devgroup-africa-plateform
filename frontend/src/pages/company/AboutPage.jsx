import { CallToAction } from '../../components/common/CallToAction'
import { PageHero } from '../../components/common/PageHero'
import { PublicLayout } from '../../layouts/PublicLayout'

export function AboutPage() {
  return <PublicLayout><PageHero eyebrow="À propos" title="Une équipe qui construit le numérique depuis l’Afrique." text="DevGroup Africa accompagne les organisations ambitieuses dans la création de produits numériques utiles et durables." /><section><div className="container split about-split"><div><span className="eyebrow">Notre conviction</span><h2>Les meilleures solutions commencent par une bonne compréhension du problème.</h2></div><div><p>Nous réunissons stratégie, design et ingénierie pour rendre les projets complexes plus simples à piloter et plus agréables à utiliser.</p><p>Notre manière de travailler repose sur l’écoute, la transparence et la recherche constante d’impact.</p></div></div></section><section className="soft-section"><div className="container stats"><div><strong>24+</strong><span>projets accompagnés</span></div><div><strong>8</strong><span>expertises réunies</span></div><div><strong>100%</strong><span>engagés sur vos objectifs</span></div></div></section><CallToAction /></PublicLayout>
}
