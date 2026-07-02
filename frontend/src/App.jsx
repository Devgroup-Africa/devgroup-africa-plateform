import { AppRouter } from './app/AppRouter'
import { GlobalLoader } from './components/common/GlobalLoader'
import { AnalyticsManager } from './seo/AnalyticsManager'
import { SeoManager } from './seo/SeoManager'

export default function App() {
  return (
    <>
      <SeoManager />
      <AnalyticsManager />
      <AppRouter />
      <GlobalLoader />
    </>
  )
}
