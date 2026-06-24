import { Route, Routes } from 'react-router-dom'
import { simplePages } from '../data/simplePages'
import { AdminPage } from '../pages/admin/AdminPage'
import { LoginPage } from '../pages/admin/LoginPage'
import { BlogCategoryPage } from '../pages/blog/BlogCategoryPage'
import { BlogPage } from '../pages/blog/BlogPage'
import { PostDetailPage } from '../pages/blog/PostDetailPage'
import { AboutPage } from '../pages/company/AboutPage'
import { SimplePage } from '../pages/company/SimplePage'
import { ContactPage } from '../pages/contact/ContactPage'
import { HomePage } from '../pages/home/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProjectDetailPage } from '../pages/projects/ProjectDetailPage'
import { ProjectsPage } from '../pages/projects/ProjectsPage'
import { CatalogDetailPage } from '../pages/services/CatalogDetailPage'
import { CatalogPage } from '../pages/services/CatalogPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<CatalogPage type="services" />} />
      <Route path="/services/:slug" element={<CatalogDetailPage type="services" />} />
      <Route path="/solutions" element={<CatalogPage type="solutions" />} />
      <Route path="/solutions/:slug" element={<CatalogDetailPage type="solutions" />} />
      <Route path="/realisations" element={<ProjectsPage />} />
      <Route path="/realisations/:slug" element={<ProjectDetailPage />} />
      <Route path="/a-propos" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/categorie/:slug" element={<BlogCategoryPage />} />
      <Route path="/blog/:slug" element={<PostDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/devis" element={<ContactPage quote />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      {Object.keys(simplePages).map(page => <Route key={page} path={`/${page}`} element={<SimplePage page={page} />} />)}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
