import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'

export function NotFoundPage() {
  return <PublicLayout><section className="not-found"><div className="container"><span className="eyebrow">Erreur 404</span><h1>Cette page n’existe pas.</h1><Link className="button" to="/">Retour à l’accueil <ArrowRight size={17} /></Link></div></section></PublicLayout>
}
