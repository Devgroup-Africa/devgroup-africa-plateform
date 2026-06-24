import { normalizePosts } from '../../api/formatters'
import { useApiResource } from '../../api/useApiResource'
import { CallToAction } from '../../components/common/CallToAction'
import { PageHero } from '../../components/common/PageHero'
import { PostGrid } from '../../components/content/PostGrid'
import { posts } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'

export function BlogPage() {
  const { data: items } = useApiResource('/public/posts', posts, normalizePosts)

  return <PublicLayout><PageHero eyebrow="Le blog" title="Idées, méthodes et retours d’expérience." text="Nos réflexions pour mieux concevoir et piloter les projets numériques." /><section><div className="container"><PostGrid items={items} /></div></section><CallToAction /></PublicLayout>
}
