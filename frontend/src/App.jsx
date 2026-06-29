import { AppRouter } from './app/AppRouter'
import { GlobalLoader } from './components/common/GlobalLoader'

export default function App() {
  return (
    <>
      <AppRouter />
      <GlobalLoader />
    </>
  )
}
