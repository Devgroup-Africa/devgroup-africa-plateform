import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useApiResource } from '../../api/useApiResource'
import { CallToAction } from '../../components/common/CallToAction'
import { PageHero } from '../../components/common/PageHero'
import { projects } from '../../data/content'
import { PublicLayout } from '../../layouts/PublicLayout'
import { NotFoundPage } from '../NotFoundPage'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const fallback = projects.find(entry => entry.slug === slug)
  const { data: allProjects, loading } = useApiResource('/public/projects', projects)
  const project = allProjects.find(entry => entry.slug === slug) || fallback

  if (!loading && !project) return <NotFoundPage />
  if (!project) return null

  return <PublicLayout><PageHero eyebrow={project.type} title={project.title} text={project.description} /><section><div className="container case-study"><div><span className="eyebrow">Le défi</span><h2>Transformer un besoin métier complexe en expérience simple.</h2></div><div><p>{project.body || 'Cette étude de cas sera enrichie avec les objectifs, la démarche, les fonctionnalités et les résultats du projet.'}</p><Link className="button" to="/contact">Nous contacter <ArrowRight size={17} /></Link></div></div></section><CallToAction /></PublicLayout>
}
