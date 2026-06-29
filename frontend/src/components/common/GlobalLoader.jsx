import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ROUTE_LOADING_DELAY = 450

export function GlobalLoader() {
  const location = useLocation()
  const [routeLoading, setRouteLoading] = useState(true)
  const [pendingRequests, setPendingRequests] = useState(0)

  useEffect(() => {
    setRouteLoading(true)
    const timeout = window.setTimeout(() => setRouteLoading(false), ROUTE_LOADING_DELAY)

    return () => window.clearTimeout(timeout)
  }, [location.pathname, location.search])

  useEffect(() => {
    const handleStart = () => setPendingRequests(count => count + 1)
    const handleEnd = () => setPendingRequests(count => Math.max(0, count - 1))

    window.addEventListener('devgroup:loading-start', handleStart)
    window.addEventListener('devgroup:loading-end', handleEnd)

    return () => {
      window.removeEventListener('devgroup:loading-start', handleStart)
      window.removeEventListener('devgroup:loading-end', handleEnd)
    }
  }, [])

  const visible = routeLoading || pendingRequests > 0

  return (
    <div className={`global-loader ${visible ? 'is-visible' : ''}`} role="status" aria-live="polite" aria-hidden={!visible}>
      <img src="/images/Logo devgroup noir.png" alt="" />
      <span className="sr-only">Chargement</span>
    </div>
  )
}
