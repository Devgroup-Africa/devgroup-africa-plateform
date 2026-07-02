import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID

function loadAnalytics() {
  if (!measurementId || document.getElementById('ga4-script')) return

  const script = document.createElement('script')
  script.id = 'ga4-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
}

export function AnalyticsManager() {
  const location = useLocation()

  useEffect(() => {
    if (!measurementId) return

    loadAnalytics()
    window.gtag?.('config', measurementId, {
      page_path: `${location.pathname}${location.search}`,
    })
  }, [location.pathname, location.search])

  return null
}
