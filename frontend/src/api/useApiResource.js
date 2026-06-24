import { useEffect, useState } from 'react'
import { apiGet } from './client'

const identity = value => value

export function useApiResource(path, fallback, transform = identity) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(Boolean(path))
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!path) return
      setLoading(true)
      setError(null)

      try {
        const result = await apiGet(path)
        if (!cancelled) setData(transform(result))
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError)
          setData(fallback)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [path, fallback, transform])

  return { data, loading, error }
}
