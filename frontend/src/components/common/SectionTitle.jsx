import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SectionTitle({ eyebrow, title, text, link, linkLabel = 'Tout découvrir' }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && <Link className="text-link" to={link}>{linkLabel}<ArrowRight size={17} /></Link>}
    </div>
  )
}
