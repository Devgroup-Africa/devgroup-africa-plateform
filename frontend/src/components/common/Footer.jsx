import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mainNavigation } from '../../data/navigation';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Logo />
          <p>Nous concevons des produits numériques utiles, simples et durables pour les organisations africaines.</p>
        </div>
        <div>
          <h4>Explorer</h4>
          {mainNavigation.slice(0, 5).map((item) => (
            <Link key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Entreprise</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/carrieres">Carrières</Link>
          <Link to="/partenaires">Partenaires</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Nous contacter</h4>
          <a href="mailto:contact@devgroup.ga">
            <Mail size={16} /> contact@devgroup.ga
          </a>
          <a href="tel:+241077383720">
            <Phone size={16} /> +241 077 38 37 20
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 DevGroup Africa</span>
        <div>
          <Link to="/politique-de-confidentialite">Confidentialité</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/conditions-d-utilisation">Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
