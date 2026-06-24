import { BarChart3, ExternalLink, LogOut, Search, UserRound } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearSession } from '../auth/session'
import { adminSections } from '../data/navigation'

export function AdminLayout({ children }) {
  const navigate = useNavigate()

  function logout() {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-layout">
      <header className="admin-shell-header">
        <Link className="admin-brand" to="/admin" aria-label="DevGroup Africa - Tableau de bord">
          <img src="/images/logo.png" alt="" />
          <span>DevGroup Africa<small>Espace administrateur</small></span>
        </Link>
        <label className="admin-global-search">
          <Search size={17} />
          <input placeholder="Rechercher..." />
        </label>
        <div className="admin-header-icons" aria-label="Raccourcis administrateur">
          <button type="button" onClick={() => navigate('/admin/statistiques')} title="Statistiques"><BarChart3 size={17} /></button>
          <button type="button" onClick={() => navigate('/')} title="Voir le site"><ExternalLink size={17} /></button>
          <button type="button" onClick={() => navigate('/admin/profil')} title="Profil"><UserRound size={17} /></button>
          <button className="admin-avatar" type="button" onClick={() => navigate('/admin/profil')}><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="" /></button>
          <button className="admin-logout-icon" onClick={logout} type="button"><LogOut size={17} /></button>
        </div>
      </header>
      <nav className="admin-top-nav">
        {adminSections.map(section => (
          <NavLink end={section.path === '/admin'} key={section.path} to={section.path}>{section.label}</NavLink>
        ))}
      </nav>
      <main className="admin-main">{children}</main>
    </div>
  )
}
