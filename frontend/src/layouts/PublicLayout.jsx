import { Footer } from '../components/common/Footer'
import { Header } from '../components/common/Header'
import { ScrollToTop } from '../components/common/ScrollToTop'

export function PublicLayout({ children }) {
  return <><ScrollToTop /><Header /><main>{children}</main><Footer /></>
}
