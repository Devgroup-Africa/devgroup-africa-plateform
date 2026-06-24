import { useParams } from 'react-router-dom'
import { normalizePost } from '../../api/formatters'
import { useApiResource } from '../../api/useApiResource'
import { posts } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'
import { NotFoundPage } from '../NotFoundPage'

export function PostDetailPage() {
  const { slug } = useParams()
  const fallback = posts.find(entry => entry.slug === slug)
  const { data: post, loading } = useApiResource(
    `/public/posts/${slug}`,
    fallback,
    normalizePost,
  )

  if (!loading && !post) return <NotFoundPage />
  if (!post) return null

  return (
    <PublicLayout>
      <article className="article">
        <div className="container article-narrow">
          <span className="tag">{post.category}</span>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.description}</p>
          <span>{post.date} · {post.readingTime || '5 min de lecture'}</span>
          {post.coverImage && <img className="article-cover" src={post.coverImage} alt="" />}
          <div className="article-body">
            {(post.body || '').split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </div>
      </article>
    </PublicLayout>
  )
}
