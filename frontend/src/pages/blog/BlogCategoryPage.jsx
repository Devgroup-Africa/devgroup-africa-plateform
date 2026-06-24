import { useParams } from 'react-router-dom'
import { normalizePosts } from '../../api/formatters'
import { useApiResource } from '../../api/useApiResource'
import { PageHero } from '../../components/common/PageHero'
import { PostGrid } from '../../components/content/PostGrid'
import { posts } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'

export function BlogCategoryPage() {
  const { slug } = useParams()
  const label = slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll('-', ' ')
  const { data: items } = useApiResource('/public/posts', posts, normalizePosts)
  const filtered = items.filter(post => post.category.toLowerCase().replaceAll(' ', '-') === slug)

  return <PublicLayout><PageHero eyebrow="Catégorie" title={label} text="Retrouvez les articles et réflexions liés à cette catégorie." /><section><div className="container"><PostGrid items={filtered.length ? filtered : items} /></div></section></PublicLayout>
}
