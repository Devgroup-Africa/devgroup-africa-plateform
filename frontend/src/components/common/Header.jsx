import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { mainNavigation } from '../../data/navigation'
import { Logo } from './Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const floatingByDefault = /^\/(services|solutions)\/[^/]+$/.test(pathname)
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-header${scrolled || floatingByDefault ? ' site-header-scrolled' : ''}`}>
      <div className="container nav-wrap">
        <Logo />
        <nav className={open ? 'nav-open' : ''}>
          {mainNavigation.map(item => <NavLink key={item.path} to={item.path}>{item.label}</NavLink>)}
          <Link className="button button-small" to="/devis">Demander un devis <ArrowRight size={15} /></Link>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
