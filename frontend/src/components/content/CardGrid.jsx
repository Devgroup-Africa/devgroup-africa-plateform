import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function CardGrid({ items, basePath, limit }) {
  return (
    <div className="card-grid">
      {items.slice(0, limit || items.length).map(item => {
        const ItemIcon = item.icon
        return (
          <Link className="service-card" to={`${basePath}/${item.slug}`} key={item.slug}>
            {ItemIcon && <span className="icon-box"><ItemIcon size={24} /></span>}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="circle-link"><ArrowRight size={17} /></span>
          </Link>
        )
      })}
    </div>
  )
}
