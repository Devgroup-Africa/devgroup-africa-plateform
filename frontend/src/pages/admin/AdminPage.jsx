import { useCallback, useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  Eye,
  Image,
  Pencil,
  Send,
  Trash2,
  Users,
  Video,
} from 'lucide-react'
import { apiDelete, apiGet, apiSend } from '../../api/client'
import { clearSession, getAuthToken, getAuthUser } from '../../auth/session'
import { AdminLayout } from '../../layouts/AdminLayout'

const emptyData = {
  dashboard: null,
  catalog: [],
  projects: [],
  posts: [],
  contacts: [],
  communication: [],
  users: [],
  media: [],
  activity: [],
  alerts: [],
}

function formatDate(value) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
}

function formatDateTime(value) {
  if (!value) return '-'
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function statusLabel(status) {
  const labels = {
    draft: 'Brouillon',
    published: 'Publie',
    idea: 'Idee',
    planned: 'Planifie',
    new: 'Nouveau',
    read: 'Lu',
    archived: 'Archive',
    active: 'Actif',
    resolved: 'Resolue',
    info: 'Info',
    medium: 'Moyenne',
    high: 'Haute',
    created: 'Creation',
    updated: 'Modification',
    deleted: 'Suppression',
    login: 'Connexion',
    seed: 'Initialisation',
  }
  return labels[status] || status || '-'
}

function resourceLabel(resource) {
  const labels = {
    catalog: 'Catalogue',
    projects: 'Projet',
    posts: 'Article',
    contacts: 'Contact',
    communication: 'Communication',
    users: 'Utilisateur',
    media: 'Media',
    pages: 'Page',
  }
  return labels[resource] || resource || 'Element'
}

function PageTitle({ eyebrow, title, text, count }) {
  return (
    <div className="admin-page-title">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
      {count && <strong>{count}</strong>}
    </div>
  )
}

function Panel({ title, actions, children, className = '' }) {
  return (
    <section className={`admin-card-panel ${className}`}>
      <div className="admin-panel-head">
        <h2>{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  )
}

function SearchBar() {
  return (
    <label className="admin-table-search">
      <span>⌕</span>
      <input placeholder="Rechercher..." />
    </label>
  )
}

function EmptyState({ children = 'Aucune donnee disponible pour le moment.' }) {
  return <div className="admin-empty-state">{children}</div>
}

function ActionButtons({ viewUrl = '', onEdit, onDelete }) {
  return (
    <div className="admin-actions">
      {viewUrl && <button type="button" onClick={() => window.open(viewUrl, '_blank', 'noopener,noreferrer')} title="Ouvrir"><Eye size={16} /></button>}
      {onEdit && <button type="button" onClick={onEdit} title="Modifier"><Pencil size={16} /></button>}
      {onDelete && <button type="button" className="danger" onClick={onDelete} title="Supprimer"><Trash2 size={16} /></button>}
    </div>
  )
}

async function deleteResource(resource, id, reload) {
  if (!window.confirm('Supprimer cet element ? Cette action est definitive.')) return
  try {
    await apiDelete(`/admin/${resource}/${id}`)
    reload()
  } catch {
    window.alert('Suppression impossible. Rechargez la page puis reessayez.')
  }
}

function useAdminData() {
  const [data, setData] = useState(emptyData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const [dashboard, catalog, projects, posts, contacts, communication, users, media, activity, alerts] = await Promise.all([
        apiGet('/admin/dashboard'),
        apiGet('/admin/catalog'),
        apiGet('/admin/projects'),
        apiGet('/admin/posts'),
        apiGet('/admin/contacts'),
        apiGet('/admin/communication'),
        apiGet('/admin/users'),
        apiGet('/admin/media'),
        apiGet('/admin/activity'),
        apiGet('/admin/alerts'),
      ])
      setData({ dashboard, catalog, projects, posts, contacts, communication, users, media, activity, alerts })
    } catch {
      setError("Impossible de charger les donnees d'administration.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, reload: load }
}

function Dashboard({ data }) {
  const services = data.catalog.filter(item => item.type === 'service')
  const solutions = data.catalog.filter(item => item.type === 'solution')
  const publishedProjects = data.projects.filter(item => item.status === 'published')
  const draftProjects = data.projects.filter(item => item.status === 'draft')
  const mediaCount = data.media.length
  const recentItems = data.activity.slice(0, 8).map(item => ({
    title: item.title,
    meta: `${statusLabel(item.action)} - ${resourceLabel(item.resource)}`,
    date: item.createdAt,
    icon: item.resource === 'projects' ? <CalendarDays size={17} /> : item.resource === 'media' || item.resource === 'posts' ? <Image size={17} /> : item.resource === 'users' ? <Users size={17} /> : <Video size={17} />,
    color: item.action === 'deleted' ? 'red' : item.action === 'created' ? 'green' : 'blue',
  }))

  return (
    <>
      <div className="admin-kpi-grid">
        {[
          { label: 'Services publies', value: services.filter(item => item.status === 'published').length, meta: `${solutions.length} solution(s)`, icon: <Video size={18} /> },
          { label: 'Projets publies', value: publishedProjects.length, meta: `${draftProjects.length} brouillon(s)`, icon: <CalendarDays size={18} /> },
          { label: 'Articles', value: data.posts.length, meta: `${data.posts.filter(item => item.status === 'published').length} publie(s)`, icon: <Image size={18} /> },
          { label: 'Utilisateurs', value: data.users.length, meta: `${data.users.filter(item => item.status === 'active').length} actif(s)`, icon: <Users size={18} /> },
        ].map(({ label, value, meta, icon }) => (
          <article className="admin-kpi-card" key={label}>
            <div><span>{label}</span>{icon}</div>
            <strong>{value}</strong>
            <small>{meta}</small>
          </article>
        ))}
      </div>

      <div className="admin-dashboard-grid">
        <Panel title="Activite recente" className="span-tall">
          {recentItems.length ? <div className="activity-list">{recentItems.map(item => <ActivityItem key={`${item.type}-${item.title}-${item.date}`} {...item} />)}</div> : <EmptyState />}
        </Panel>
        <Panel title="Repartition du catalogue">
          <div className="donut-wrap">
            <div className="donut-chart" />
            <div className="donut-legend"><span>Services ({services.length})</span><span>Solutions ({solutions.length})</span><span>Projets ({data.projects.length})</span></div>
          </div>
          <a className="panel-link" href="/admin/services">Voir tout</a>
        </Panel>
        <Panel title="Alertes administrateur">
          <div className="alerts-list">
            {data.alerts.map(alert => (
              <div className="alert-row" key={alert._id || alert.key}>
                <span className={alert.severity === 'warning' ? 'warn' : alert.severity === 'danger' ? 'danger' : ''}><AlertTriangle size={18} /></span>
                <div><strong>{alert.title}</strong><small>{alert.details}<br />Priorite: {statusLabel(alert.priority)} - {statusLabel(alert.status)}</small></div>
                <ChevronDown size={16} />
              </div>
            ))}
            {!data.alerts.length && <EmptyState>Aucune alerte en base.</EmptyState>}
          </div>
        </Panel>
        <Panel title="Messages recents">
          {data.contacts.length ? <table className="admin-simple-table"><tbody>{data.contacts.slice(0, 4).map(contact => <tr key={contact._id}><td>{contact.name}</td><td>{contact.source}</td><td><b>{statusLabel(contact.status)}</b></td></tr>)}</tbody></table> : <EmptyState />}
        </Panel>
        <Panel title="Contenus par categorie">
          <div className="bar-list">{[['Services', services.length, 100], ['Solutions', solutions.length, 80], ['Projets', data.projects.length, 70], ['Articles', data.posts.length, 60], ['Medias', mediaCount, 90]].map(([label, value, width]) => <div key={label}><span>{label}</span><strong style={{ width: `${Math.max(width, 18)}%` }}>{value}</strong></div>)}</div>
          <a className="panel-link" href="/admin/statistiques">Voir tout</a>
        </Panel>
      </div>
    </>
  )
}

function ActivityItem({ icon, color, title, meta, date }) {
  return (
    <div className="activity-item">
      <span className={`activity-icon ${color}`}>{icon}</span>
      <div><strong>{title}</strong><small>{meta}</small></div>
      <time>{formatDate(date)}</time>
      <ChevronDown size={16} />
    </div>
  )
}

function MembersPage({ users, reload }) {
  const [editingUser, setEditingUser] = useState(null)

  return (
    <>
      <PageTitle eyebrow="Acces" title="Utilisateurs" text="Comptes charges depuis la collection users." count={`${users.length} compte(s)`} />
      <div className="admin-split-grid">
        <Panel title="Comptes enregistres" actions={<SearchBar />} className="admin-table-panel">
          <table className="admin-data-table">
            <thead><tr><th>Compte</th><th>Role</th><th>Perimetre</th><th>Securite</th><th>Inscrit le</th><th>Actions</th></tr></thead>
            <tbody>{users.map(member => <tr key={member._id}><td><img src={member.avatar || '/images/logo.png'} alt="" /><div><strong>{member.name}</strong><small>{member.email}</small></div></td><td><b className="role-pill">{member.role}</b></td><td>{member.scope || 'Administration'}</td><td>{statusLabel(member.status)}</td><td>{formatDate(member.createdAt)}</td><td><ActionButtons onEdit={() => setEditingUser(member)} onDelete={() => deleteResource('users', member._id, reload)} /></td></tr>)}</tbody>
          </table>
          {!users.length && <EmptyState>Aucun utilisateur en base.</EmptyState>}
        </Panel>
        <UserForm editingUser={editingUser} onCancel={() => setEditingUser(null)} reload={reload} />
      </div>
    </>
  )
}

const emptyUser = { name: '', email: '', password: '', role: 'editor', scope: 'Administration', status: 'active', avatar: '' }

function UserForm({ editingUser, onCancel, reload }) {
  const [draft, setDraft] = useState(emptyUser)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingUser) {
      setDraft({ name: editingUser.name || '', email: editingUser.email || '', password: '', role: editingUser.role || 'editor', scope: editingUser.scope || 'Administration', status: editingUser.status || 'active', avatar: editingUser.avatar || '' })
    } else {
      setDraft(emptyUser)
    }
    setMessage('')
  }, [editingUser])

  async function submit(event) {
    event.preventDefault()
    setMessage('')
    try {
      const payload = { ...draft }
      if (!payload.password) delete payload.password
      if (editingUser) {
        await apiSend(`/admin/users/${editingUser._id}`, payload, 'PUT')
      } else {
        await apiSend('/admin/users', payload)
      }
      setDraft(emptyUser)
      setMessage(editingUser ? 'Utilisateur modifie.' : 'Utilisateur cree.')
      onCancel()
      reload()
    } catch {
      setMessage('Creation impossible. Verifiez email, mot de passe et role.')
    }
  }

  return (
    <Panel title={editingUser ? 'Modifier utilisateur' : 'Nouvel utilisateur'} className="side-form">
      <form onSubmit={submit}>
        <label>Nom complet<input required value={draft.name} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label>
        <label>Email<input required type="email" value={draft.email} onChange={event => setDraft({ ...draft, email: event.target.value })} /></label>
        <label>{editingUser ? 'Nouveau mot de passe' : 'Mot de passe temporaire'}<input required={!editingUser} type="password" value={draft.password} onChange={event => setDraft({ ...draft, password: event.target.value })} /></label>
        <label>Avatar<input value={draft.avatar} onChange={event => setDraft({ ...draft, avatar: event.target.value })} placeholder="URL de l'image" /></label>
        <label>Role<select value={draft.role} onChange={event => setDraft({ ...draft, role: event.target.value })}><option value="viewer">Viewer</option><option value="editor">Editor</option><option value="admin">Admin</option></select></label>
        <label>Perimetre<input value={draft.scope} onChange={event => setDraft({ ...draft, scope: event.target.value })} /></label>
        <label>Statut<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value })}><option value="active">Actif</option><option value="disabled">Desactive</option></select></label>
        <div className="form-actions">{editingUser && <button type="button" onClick={onCancel}>Annuler</button>}<button type="submit" className="primary">{editingUser ? 'Enregistrer' : 'Creer'}</button></div>
      </form>
      {message && <p>{message}</p>}
    </Panel>
  )
}

function ProjectsPage({ projects, reload }) {
  const [editingProject, setEditingProject] = useState(null)

  return (
    <>
      <PageTitle eyebrow="Production" title="Projets" text="Donnees chargees depuis la collection projects." count={`${projects.length} projet(s)`} />
      <div className="admin-split-grid">
        <Panel title="Liste des projets" actions={<SearchBar />} className="admin-table-panel">
          <table className="admin-data-table">
            <thead><tr><th>Titre</th><th>Type</th><th>Slug</th><th>Statut</th><th>Mis a jour</th><th>Actions</th></tr></thead>
            <tbody>{projects.map(project => <tr key={project._id}><td><strong>{project.title}</strong></td><td>{project.type}</td><td>{project.slug}</td><td><b className="status-pill">{statusLabel(project.status)}</b></td><td>{formatDate(project.updatedAt)}</td><td><ActionButtons viewUrl={`/realisations/${project.slug}`} onEdit={() => setEditingProject(project)} onDelete={() => deleteResource('projects', project._id, reload)} /></td></tr>)}</tbody>
          </table>
          {!projects.length && <EmptyState />}
        </Panel>
        <ProjectForm editingProject={editingProject} onCancel={() => setEditingProject(null)} reload={reload} />
      </div>
    </>
  )
}

const emptyProject = { title: '', slug: '', type: '', description: '', body: '', color: 'blue', order: 0, status: 'draft' }

function ProjectForm({ editingProject, onCancel, reload }) {
  const [draft, setDraft] = useState(emptyProject)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingProject) {
      setDraft({
        title: editingProject.title || '',
        slug: editingProject.slug || '',
        type: editingProject.type || '',
        description: editingProject.description || '',
        body: editingProject.body || '',
        color: editingProject.color || 'blue',
        order: editingProject.order || 0,
        status: editingProject.status || 'draft',
      })
    } else {
      setDraft(emptyProject)
    }
    setMessage('')
  }, [editingProject])

  async function submit(event) {
    event.preventDefault()
    setMessage('')
    try {
      if (editingProject) {
        await apiSend(`/admin/projects/${editingProject._id}`, draft, 'PUT')
      } else {
        await apiSend('/admin/projects', draft)
      }
      setDraft(emptyProject)
      setMessage(editingProject ? 'Projet modifie.' : 'Projet cree.')
      onCancel()
      reload()
    } catch {
      setMessage('Creation impossible. Verifiez les champs obligatoires.')
    }
  }

  return (
    <Panel title={editingProject ? 'Modifier projet' : 'Nouveau projet'} className="side-form">
      <form onSubmit={submit}>
        <label>Titre<input required value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} /></label>
        <label>Slug<input required value={draft.slug} onChange={event => setDraft({ ...draft, slug: event.target.value })} /></label>
        <label>Type<input required value={draft.type} onChange={event => setDraft({ ...draft, type: event.target.value })} /></label>
        <label>Description<textarea required value={draft.description} onChange={event => setDraft({ ...draft, description: event.target.value })} /></label>
        <label>Contenu detaille<textarea value={draft.body} onChange={event => setDraft({ ...draft, body: event.target.value })} /></label>
        <div className="two-fields"><label>Couleur<input value={draft.color} onChange={event => setDraft({ ...draft, color: event.target.value })} /></label><label>Ordre<input type="number" value={draft.order} onChange={event => setDraft({ ...draft, order: Number(event.target.value) })} /></label></div>
        <label>Statut<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value })}><option value="draft">Brouillon</option><option value="published">Publie</option></select></label>
        <div className="form-actions">{editingProject && <button type="button" onClick={onCancel}>Annuler</button>}<button className="primary" type="submit">Enregistrer</button></div>
      </form>
      {message && <p>{message}</p>}
    </Panel>
  )
}

function ServicesPage({ catalog, reload }) {
  const [editingItem, setEditingItem] = useState(null)

  return (
    <>
      <PageTitle eyebrow="Catalogue" title="Services et solutions" text="Donnees chargees depuis la collection catalog." count={`${catalog.length} element(s)`} />
      <div className="admin-split-grid">
        <Panel title="Catalogue" actions={<SearchBar />} className="admin-table-panel">
          <table className="admin-data-table">
            <thead><tr><th>Titre</th><th>Type</th><th>Slug</th><th>Statut</th><th>Ordre</th><th>Actions</th></tr></thead>
            <tbody>{catalog.map(item => <tr key={item._id}><td><strong>{item.title}</strong><small>{item.description}</small></td><td>{item.type}</td><td>{item.slug}</td><td><b className="status-pill">{statusLabel(item.status)}</b></td><td>{item.order}</td><td><ActionButtons viewUrl={`/${item.type === 'service' ? 'services' : 'solutions'}/${item.slug}`} onEdit={() => setEditingItem(item)} onDelete={() => deleteResource('catalog', item._id, reload)} /></td></tr>)}</tbody>
          </table>
          {!catalog.length && <EmptyState />}
        </Panel>
        <CatalogForm editingItem={editingItem} onCancel={() => setEditingItem(null)} reload={reload} />
      </div>
    </>
  )
}

const emptyCatalogItem = { type: 'service', slug: '', title: '', description: '', icon: 'Blocks', order: 0, status: 'published' }

function CatalogForm({ editingItem, onCancel, reload }) {
  const [draft, setDraft] = useState(emptyCatalogItem)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingItem) {
      setDraft({
        type: editingItem.type || 'service',
        slug: editingItem.slug || '',
        title: editingItem.title || '',
        description: editingItem.description || '',
        icon: editingItem.icon || 'Blocks',
        order: editingItem.order || 0,
        status: editingItem.status || 'published',
      })
    } else {
      setDraft(emptyCatalogItem)
    }
    setMessage('')
  }, [editingItem])

  async function submit(event) {
    event.preventDefault()
    setMessage('')
    try {
      if (editingItem) {
        await apiSend(`/admin/catalog/${editingItem._id}`, draft, 'PUT')
      } else {
        await apiSend('/admin/catalog', draft)
      }
      setDraft(emptyCatalogItem)
      setMessage(editingItem ? 'Element modifie.' : 'Element cree.')
      onCancel()
      reload()
    } catch {
      setMessage('Enregistrement impossible. Verifiez les champs.')
    }
  }

  return (
    <Panel title={editingItem ? 'Modifier catalogue' : 'Nouvel element'} className="side-form">
      <form onSubmit={submit}>
        <label>Type<select value={draft.type} onChange={event => setDraft({ ...draft, type: event.target.value })}><option value="service">Service</option><option value="solution">Solution</option></select></label>
        <label>Titre<input required value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} /></label>
        <label>Slug<input required value={draft.slug} onChange={event => setDraft({ ...draft, slug: event.target.value })} /></label>
        <label>Description<textarea required value={draft.description} onChange={event => setDraft({ ...draft, description: event.target.value })} /></label>
        <div className="two-fields"><label>Icone<input value={draft.icon} onChange={event => setDraft({ ...draft, icon: event.target.value })} /></label><label>Ordre<input type="number" value={draft.order} onChange={event => setDraft({ ...draft, order: Number(event.target.value) })} /></label></div>
        <label>Statut<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value })}><option value="draft">Brouillon</option><option value="published">Publie</option></select></label>
        <div className="form-actions">{editingItem && <button type="button" onClick={onCancel}>Annuler</button>}<button type="submit" className="primary">Enregistrer</button></div>
      </form>
      {message && <p>{message}</p>}
    </Panel>
  )
}

function CommunicationPage({ communication, reload }) {
  const [editingItem, setEditingItem] = useState(null)
  const [draft, setDraft] = useState({ title: '', channel: 'Site web', objective: '', message: '', scheduledAt: '', status: 'idea' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingItem) {
      setDraft({
        title: editingItem.title || '',
        channel: editingItem.channel || 'Site web',
        objective: editingItem.objective || '',
        message: editingItem.message || '',
        scheduledAt: editingItem.scheduledAt ? new Date(editingItem.scheduledAt).toISOString().slice(0, 16) : '',
        status: editingItem.status || 'idea',
      })
    } else {
      setDraft({ title: '', channel: 'Site web', objective: '', message: '', scheduledAt: '', status: 'idea' })
    }
    setMessage('')
  }, [editingItem])

  async function submit(event) {
    event.preventDefault()
    setMessage('')
    try {
      if (editingItem) {
        await apiSend(`/admin/communication/${editingItem._id}`, { ...draft, scheduledAt: draft.scheduledAt || undefined }, 'PUT')
      } else {
        await apiSend('/admin/communication', { ...draft, scheduledAt: draft.scheduledAt || undefined })
      }
      setDraft({ title: '', channel: 'Site web', objective: '', message: '', scheduledAt: '', status: 'idea' })
      setMessage(editingItem ? 'Communication modifiee.' : 'Communication creee.')
      setEditingItem(null)
      reload()
    } catch {
      setMessage('Creation impossible. Verifiez les champs obligatoires.')
    }
  }

  return (
    <>
      <PageTitle eyebrow="Communication" title="Notifications" text="Donnees chargees depuis la collection communication." count={`${communication.length} notification(s)`} />
      <div className="admin-split-grid">
        <Panel title="Historique des notifications" actions={<SearchBar />} className="admin-table-panel empty-table">
          <table className="admin-data-table">
            <thead><tr><th>Titre</th><th>Canal</th><th>Objectif</th><th>Statut</th><th>Date d'envoi</th><th>Actions</th></tr></thead>
            <tbody>{communication.map(item => <tr key={item._id}><td><strong>{item.title}</strong></td><td>{item.channel}</td><td>{item.objective || '-'}</td><td><b className="status-pill">{statusLabel(item.status)}</b></td><td>{formatDateTime(item.scheduledAt)}</td><td><ActionButtons onEdit={() => setEditingItem(item)} onDelete={() => deleteResource('communication', item._id, reload)} /></td></tr>)}</tbody>
          </table>
          {!communication.length && <EmptyState />}
        </Panel>
        <Panel title={editingItem ? 'Modifier notification' : 'Nouvelle notification'} className="side-form">
          <form onSubmit={submit}>
            <p>Creez une communication enregistree en base.</p>
            <label>Titre<input required value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} placeholder="Saisissez le titre" /></label>
            <label>Canal<select value={draft.channel} onChange={event => setDraft({ ...draft, channel: event.target.value })}><option>Site web</option><option>Newsletter</option><option>LinkedIn</option><option>Facebook</option><option>WhatsApp</option></select></label>
            <label>Objectif<input value={draft.objective} onChange={event => setDraft({ ...draft, objective: event.target.value })} /></label>
            <label>Message<textarea required value={draft.message} onChange={event => setDraft({ ...draft, message: event.target.value })} placeholder="Saisissez le corps du message..." /></label>
            <label>Planification<input type="datetime-local" value={draft.scheduledAt} onChange={event => setDraft({ ...draft, scheduledAt: event.target.value })} /></label>
            <label>Statut<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value })}><option value="idea">Idee</option><option value="planned">Planifie</option><option value="published">Publie</option></select></label>
            <div className="form-actions"><button type="button" onClick={() => editingItem ? setEditingItem(null) : setDraft({ title: '', channel: 'Site web', objective: '', message: '', scheduledAt: '', status: 'idea' })}>{editingItem ? 'Annuler' : 'Reinitialiser'}</button><button type="submit" className="primary"><Send size={16} /> Enregistrer</button></div>
          </form>
          {message && <p>{message}</p>}
        </Panel>
      </div>
    </>
  )
}

function StatsPage({ data }) {
  const metrics = [
    { label: 'Pages CMS', value: data.dashboard?.pages ?? data.pages?.length ?? 0, note: 'Collection pages', icon: <Users size={17} /> },
    { label: 'Catalogue', value: data.dashboard?.catalog ?? data.catalog.length, note: 'Services et solutions', icon: <Eye size={17} /> },
    { label: 'Projets', value: data.dashboard?.projects ?? data.projects.length, note: 'Realisations', icon: <Users size={17} /> },
    { label: 'Medias', value: data.dashboard?.media ?? data.media.length, note: 'Bibliotheque', icon: <Video size={17} /> },
  ]
  return (
    <>
      <PageTitle title="Statistiques et Analyses" />
      <div className="stats-kpis">{metrics.map(({ label, value, note, icon }) => <article key={label}><div><span>{label}</span>{icon}</div><strong>{value}</strong><small>{note}</small></article>)}</div>
      <h2 className="section-subtitle">Vue d'ensemble des contenus</h2>
      <div className="chart-grid">
        <Panel title="Volumes par ressource"><div className="bar-chart">{[data.catalog.length, data.projects.length, data.posts.length, data.contacts.length, data.communication.length, data.users.length, data.media.length].map((count, index) => <span key={index} style={{ height: `${Math.min(90, Math.max(12, count * 12))}%` }} />)}</div></Panel>
        <Panel title="Communications planifiees"><div className="line-chart"><svg viewBox="0 0 360 170"><polyline points={`0,${150 - data.communication.length * 8} 90,110 180,130 270,80 340,${120 - data.projects.length * 6}`} /></svg></div></Panel>
      </div>
    </>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  const user = getAuthUser()

  function logout() {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  return (
    <>
      <PageTitle eyebrow="Compte administrateur" title="Mon profil" text="Consultez vos informations, verifiez les emails et securisez votre compte." />
      <div className="profile-grid">
        <aside className="profile-card"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" alt="" /><h2>{user?.email || 'Administrateur'}</h2><p>{user?.email || '-'}</p><b>{user?.role || 'admin'}</b><dl><dt>Perimetre</dt><dd>Administration</dd><dt>Espace</dt><dd>DevGroup Africa</dd><dt>Session</dt><dd>Connectee</dd></dl></aside>
        <div className="profile-content">
          <div className="profile-top-cards"><Panel title="Email"><p>{user?.email || 'Aucun email connecte'}</p></Panel><Panel title="Droits actifs"><div className="permission-pills static"><span>Services</span><span>Projets</span><span>Medias</span><span>Users</span><span>Notifications</span><span>Stats</span></div></Panel><Panel title="Compte connecte"><p>Deconnectez-vous apres vos actions d'administration.</p><button className="logout-red" type="button" onClick={logout}>Se deconnecter</button></Panel></div>
          <Panel title="Informations personnelles" className="side-form profile-form"><div className="upload-row"><img src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80'} alt="" /></div><input value={user?.email || ''} readOnly /><div className="three-fields"><label>Email<input value={user?.email || ''} readOnly /></label><label>Role<input value={user?.role || 'admin'} readOnly /></label><label>Perimetre<input value={user?.scope || 'Administration'} readOnly /></label></div></Panel>
        </div>
      </div>
    </>
  )
}

function MediaPage({ media, reload }) {
  const [editingItem, setEditingItem] = useState(null)

  return (
    <>
      <PageTitle eyebrow="Medias" title="Bibliotheque" text="Visuels issus des contenus en base." count={`${media.length} media(s)`} />
      <div className="admin-split-grid">
        <Panel title="Medias references" actions={<SearchBar />} className="admin-table-panel">
          <table className="admin-data-table">
            <thead><tr><th>Titre</th><th>Type</th><th>URL</th><th>Mis a jour</th><th>Actions</th></tr></thead>
            <tbody>{media.map(item => <tr key={item._id}><td><strong>{item.title}</strong><small>{item.alt}</small></td><td>{item.type}</td><td>{item.url}</td><td>{formatDate(item.updatedAt)}</td><td><ActionButtons viewUrl={item.url} onEdit={() => setEditingItem(item)} onDelete={() => deleteResource('media', item._id, reload)} /></td></tr>)}</tbody>
          </table>
          {!media.length && <EmptyState />}
        </Panel>
        <MediaForm editingItem={editingItem} onCancel={() => setEditingItem(null)} reload={reload} />
      </div>
    </>
  )
}

const emptyMediaItem = { title: '', url: '', type: 'image', alt: '', source: 'admin', status: 'published' }

function MediaForm({ editingItem, onCancel, reload }) {
  const [draft, setDraft] = useState(emptyMediaItem)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingItem) {
      setDraft({
        title: editingItem.title || '',
        url: editingItem.url || '',
        type: editingItem.type || 'image',
        alt: editingItem.alt || '',
        source: editingItem.source || 'admin',
        status: editingItem.status || 'published',
      })
    } else {
      setDraft(emptyMediaItem)
    }
    setMessage('')
  }, [editingItem])

  async function submit(event) {
    event.preventDefault()
    setMessage('')
    try {
      if (editingItem) {
        await apiSend(`/admin/media/${editingItem._id}`, draft, 'PUT')
      } else {
        await apiSend('/admin/media', draft)
      }
      setDraft(emptyMediaItem)
      setMessage(editingItem ? 'Media modifie.' : 'Media cree.')
      onCancel()
      reload()
    } catch {
      setMessage('Enregistrement impossible. Verifiez le titre et l URL.')
    }
  }

  return (
    <Panel title={editingItem ? 'Modifier media' : 'Nouveau media'} className="side-form">
      <form onSubmit={submit}>
        <label>Titre<input required value={draft.title} onChange={event => setDraft({ ...draft, title: event.target.value })} /></label>
        <label>URL<input required value={draft.url} onChange={event => setDraft({ ...draft, url: event.target.value })} /></label>
        <label>Texte alternatif<input value={draft.alt} onChange={event => setDraft({ ...draft, alt: event.target.value })} /></label>
        <div className="two-fields"><label>Type<select value={draft.type} onChange={event => setDraft({ ...draft, type: event.target.value })}><option value="image">Image</option><option value="video">Video</option><option value="document">Document</option></select></label><label>Source<input value={draft.source} onChange={event => setDraft({ ...draft, source: event.target.value })} /></label></div>
        <label>Statut<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value })}><option value="draft">Brouillon</option><option value="published">Publie</option></select></label>
        <div className="form-actions">{editingItem && <button type="button" onClick={onCancel}>Annuler</button>}<button type="submit" className="primary">Enregistrer</button></div>
      </form>
      {message && <p>{message}</p>}
    </Panel>
  )
}

export function AdminPage() {
  const { pathname } = useLocation()
  const current = pathname.split('/')[2] || 'dashboard'
  const { data, loading, error, reload } = useAdminData()
  const pages = useMemo(() => ({
    dashboard: <Dashboard data={data} />,
    membres: <MembersPage users={data.users} reload={reload} />,
    services: <ServicesPage catalog={data.catalog} reload={reload} />,
    projets: <ProjectsPage projects={data.projects} reload={reload} />,
    communication: <CommunicationPage communication={data.communication} reload={reload} />,
    statistiques: <StatsPage data={data} />,
    profil: <ProfilePage />,
    medias: <MediaPage media={data.media} reload={reload} />,
  }), [data, reload])

  if (!getAuthToken()) {
    return <Navigate to="/admin/login" replace />
  }

  if (loading) {
    return <AdminLayout><EmptyState>Chargement des donnees depuis la base...</EmptyState></AdminLayout>
  }

  if (error) {
    return <AdminLayout><EmptyState>{error}</EmptyState></AdminLayout>
  }

  return <AdminLayout>{pages[current] || pages.dashboard}</AdminLayout>
}
