import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { posts } from '../../data/content'

export function PostGrid({ items = posts }) {
  return (
    <div className="post-grid">
      {items.map(post => (
        <Link to={`/blog/${post.slug}`} className="post-card" key={post.slug}>
          {post.coverImage && <img className="post-card-image" src={post.coverImage} alt={post.title} loading="lazy" />}
          <span className="tag">{post.category}</span><h3>{post.title}</h3><p>{post.description}</p>
          <div><span>{post.date}</span><ArrowRight size={17} /></div>
        </Link>
      ))}
    </div>
  )
}
