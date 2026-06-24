export function formatPostDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function normalizePost(post) {
  return {
    ...post,
    date: post.date || formatPostDate(post.publishedAt),
  }
}

export function normalizePosts(posts) {
  return posts.map(normalizePost)
}
