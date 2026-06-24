const TOKEN_KEY = 'devgroup_admin_token'
const USER_KEY = 'devgroup_admin_user'

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getAuthUser() {
  const value = localStorage.getItem(USER_KEY)
  return value ? JSON.parse(value) : null
}

export function saveSession(session) {
  localStorage.setItem(TOKEN_KEY, session.token)
  localStorage.setItem(USER_KEY, JSON.stringify(session.user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
