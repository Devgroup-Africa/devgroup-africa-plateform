import { Mail, Phone } from 'lucide-react';
import { PageHero } from '../../components/common/PageHero';
import { ContactForm } from '../../components/forms/ContactForm';
import { PublicLayout } from '../../layouts/PublicLayout';

export function ContactPage({ quote = false }) {
  return (
    <PublicLayout>
      <PageHero
        eyebrow={quote ? 'Demander un devis' : 'Contact'}
        title={quote ? 'Parlons de votre prochain projet.' : 'Une question, une idée ou un défi à partager ?'}
        text="Donnez-nous quelques éléments. Notre équipe vous répondra rapidement pour organiser la suite."
      />
      <section>
        <div className="container contact-grid">
          <div>
            <h2>Construisons quelque chose d’utile.</h2>
            <p>Nous sommes basés à Libreville et travaillons avec des organisations partout en Afrique.</p>
            <a href="mailto:contact@devgroup.ga">
              <Mail size={18} /> contact@devgroup.ga
            </a>
            <a href="tel:+241077383720">
              <Phone size={18} /> +241 077 38 37 20
            </a>
          </div>
          <ContactForm quote={quote} />
        </div>
      </section>
    </PublicLayout>
  );
}
