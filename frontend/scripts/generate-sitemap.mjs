import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const outputPath = resolve(rootDir, 'public', 'sitemap.xml')
const robotsPath = resolve(rootDir, 'public', 'robots.txt')
const siteUrl = (process.env.VITE_SITE_URL || 'https://devgroup.ga').replace(/\/$/, '')

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/services', priority: '0.9' },
  { path: '/solutions', priority: '0.9' },
  { path: '/realisations', priority: '0.8' },
  { path: '/a-propos', priority: '0.75' },
  { path: '/blog', priority: '0.75' },
  { path: '/contact', priority: '0.8' },
  { path: '/devis', priority: '0.8' },
]

async function readSource(relativePath) {
  return readFile(resolve(rootDir, relativePath), 'utf8')
}

function collectSlugs(source, arrayName) {
  const start = source.indexOf(`export const ${arrayName} = [`)
  if (start === -1) return []

  const nextExport = source.indexOf('\nexport const ', start + 1)
  const block = source.slice(start, nextExport === -1 ? source.length : nextExport)
  return [...block.matchAll(/slug:\s*'([^']+)'/g)].map(match => match[1])
}

function collectSimplePages(source) {
  const blockMatch = source.match(/export const simplePages = \{([\s\S]*)\}\s*$/)
  if (!blockMatch) return []

  return [...blockMatch[1].matchAll(/^\s*(?:'([^']+)'|([a-zA-Z0-9-]+)):\s*\[/gm)]
    .map(match => match[1] || match[2])
}

const contentSource = await readSource('src/data/content.js')
const simplePagesSource = await readSource('src/data/simplePages.js')
const serviceSlugs = collectSlugs(contentSource, 'services')
const solutionSlugs = collectSlugs(contentSource, 'solutions')
const projectSlugs = collectSlugs(contentSource, 'projects')
const postSlugs = collectSlugs(contentSource, 'posts')
const simplePageSlugs = collectSimplePages(simplePagesSource)

const dynamicRoutes = [
  ...serviceSlugs.map(slug => ({ path: `/services/${slug}`, priority: slug.includes('synthese') ? '0.7' : '0.8' })),
  ...solutionSlugs.map(slug => ({ path: `/solutions/${slug}`, priority: '0.75' })),
  ...projectSlugs.map(slug => ({ path: `/realisations/${slug}`, priority: '0.7' })),
  ...postSlugs.map(slug => ({ path: `/blog/${slug}`, priority: '0.65' })),
  ...simplePageSlugs.map(slug => ({ path: `/${slug}`, priority: slug.includes('legales') || slug.includes('confidentialite') || slug.includes('conditions') ? '0.3' : '0.5' })),
]

function formatUrl({ path, priority }) {
  const loc = `${siteUrl}${path === '/' ? '' : path}`
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

const urls = [...staticRoutes, ...dynamicRoutes]
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(formatUrl),
  '</urlset>',
  '',
].join('\n')

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, xml, 'utf8')
await writeFile(robotsPath, [
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin/',
  '',
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n'), 'utf8')

console.log(`Generated ${urls.length} URLs in ${outputPath}`)
console.log(`Generated robots.txt in ${robotsPath}`)
