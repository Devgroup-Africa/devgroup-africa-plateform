import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label="DevGroup Africa - Accueil">
      <img src="/images/logo.png" alt="" />
      <span>DevGroup<small>Africa</small></span>
    </Link>
  )
}
