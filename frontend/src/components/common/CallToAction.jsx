import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function CallToAction() {
  return (
    <section className="cta-section">
      <div className="container cta-card">
        <span className="eyebrow eyebrow-light">Votre projet</span>
        <h2>Une idée à transformer<br />en solution concrète ?</h2>
        <p>Parlons de vos objectifs et construisons la prochaine étape ensemble.</p>
        <Link className="button button-light" to="/devis">Discuter de mon projet <ArrowRight size={17} /></Link>
      </div>
    </section>
  )
}
