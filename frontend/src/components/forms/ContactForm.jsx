import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { apiSend } from '../../api/client'

export function ContactForm({ quote }) {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async event => {
    event.preventDefault()
    setError('')

    const form = new FormData(event.currentTarget)

    try {
      await apiSend('/public/contact-messages', {
        name: form.get('name'),
        email: form.get('email'),
        organization: form.get('organization'),
        needType: form.get('needType'),
        message: form.get('message'),
        source: quote ? 'quote' : 'contact',
      })
      setSent(true)
    } catch {
      setError('Impossible d’envoyer le message pour le moment. Vous pouvez réessayer dans quelques instants.')
    }
  }

  if (sent) {
    return <form className="contact-form"><div className="success"><Check size={28} /><h3>Message envoyé</h3><p>Merci. Nous reviendrons vers vous rapidement.</p></div></form>
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Nom complet<input required name="name" placeholder="Votre nom" /></label>
      <label>Email professionnel<input required name="email" type="email" placeholder="vous@entreprise.com" /></label>
      <label>Organisation<input name="organization" placeholder="Nom de votre organisation" /></label>
      {quote && <label>Type de besoin<select name="needType" defaultValue=""><option value="" disabled>Sélectionner</option><option>Site ou plateforme web</option><option>Application mobile</option><option>Application métier</option><option>Conseil et accompagnement</option></select></label>}
      <label>Votre message<textarea required name="message" rows="5" placeholder="Parlez-nous de votre besoin..." /></label>
      {error && <p className="form-error">{error}</p>}
      <button className="button" type="submit">Envoyer ma demande <ArrowRight size={17} /></button>
    </form>
  )
}
