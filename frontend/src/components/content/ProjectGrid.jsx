import { MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/content'

export function ProjectGrid({ items = projects }) {
  return (
    <div className="project-grid">
      {items.map(project => (
        <Link to={`/realisations/${project.slug}`} className={`project-card project-${project.color}`} key={project.slug}>
          <div className="project-art"><span /><span /><span /></div>
          <div><span className="tag">{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><MoveUpRight size={20} /></div>
        </Link>
      ))}
    </div>
  )
}
