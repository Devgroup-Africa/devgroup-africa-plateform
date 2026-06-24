import { getAuthToken } from '../auth/session'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7100/api'

function getHeaders(authenticated = false) {
  const headers = { 'Content-Type': 'application/json' }
  const token = getAuthToken()

  if (authenticated && token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: path.startsWith('/admin') ? getHeaders(true) : undefined,
  })
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }
  return response.json()
}

export async function apiSend(path, payload, method = 'POST') {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: getHeaders(path.startsWith('/admin')),
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}

export async function apiDelete(path) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    headers: getHeaders(path.startsWith('/admin')),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }
}

export async function apiUpload(path, formData) {
  const token = getAuthToken()
  const headers = token ? { Authorization: `Bearer ${token}` } : {}
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}
