import { PageHero } from '../../components/common/PageHero'
import { simplePages } from '../../data/simplePages'
import { PublicLayout } from '../../layouts/PublicLayout'

export function SimplePage({ page }) {
  const [eyebrow, title, text] = simplePages[page]
  return <PublicLayout><PageHero eyebrow={eyebrow} title={title} text={text} /><section><div className="container prose-box"><h2>Contenu à venir</h2><p>Cette page est prête à recevoir son contenu définitif depuis le futur espace d’administration.</p></div></section></PublicLayout>
}
