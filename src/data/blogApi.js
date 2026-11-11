const API_URL = import.meta.env.VITE_WORDPRESS_API_URL?.trim()

export function isWordPressConfigured() {
  return Boolean(API_URL)
}

export function getBlogApiBaseUrl() {
  if (!API_URL) {
    throw new Error('WordPress is not configured. Set VITE_WORDPRESS_API_URL to the WordPress REST API root.')
  }

  return API_URL.replace(/\/+$/, '')
}

function apiUrl(path, params = {}) {
  const url = new URL(`${getBlogApiBaseUrl()}/${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  return url
}

async function getJson(url, { signal } = {}) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    if (response.status === 404) throw new Error('The requested WordPress content was not found.')
    throw new Error(`WordPress could not provide the requested content (HTTP ${response.status}).`)
  }

  return response
}

export async function getWordPressPosts({
  page = 1,
  perPage = 7,
  categoryId,
  search,
  signal,
} = {}) {
  const url = apiUrl('posts', {
    status: 'publish',
    orderby: 'date',
    order: 'desc',
    page,
    per_page: perPage,
    categories: categoryId,
    search,
    _embed: 'wp:featuredmedia,wp:term,author',
  })
  const response = await getJson(url, { signal })
  const posts = await response.json()

  if (!Array.isArray(posts)) {
    throw new Error('WordPress returned an unexpected articles response.')
  }

  return {
    posts: posts.filter((post) => post.status === 'publish'),
    totalPages: Math.max(1, Number(response.headers.get('X-WP-TotalPages')) || 1),
  }
}

export async function getWordPressCategories({ signal } = {}) {
  const response = await getJson(apiUrl('categories', {
    hide_empty: true,
    per_page: 100,
    orderby: 'name',
    order: 'asc',
  }), { signal })
  const categories = await response.json()

  if (!Array.isArray(categories)) {
    throw new Error('WordPress returned an unexpected categories response.')
  }

  return categories.filter((category) => Number.isInteger(category.id) && category.name)
}

export async function getWordPressPost(slug, { signal } = {}) {
  const response = await getJson(apiUrl('posts', {
    slug,
    status: 'publish',
    _embed: 'wp:featuredmedia,wp:term,author',
  }), { signal })
  const posts = await response.json()

  if (!Array.isArray(posts)) {
    throw new Error('WordPress returned an unexpected article response.')
  }

  return posts.find((post) => post.slug === slug && post.status === 'publish') || null
}

export function getPostCategories(post) {
  const terms = post?._embedded?.['wp:term'] || []
  return terms.flat().filter((term) => term.taxonomy === 'category')
}

export function getPostImage(post) {
  const media = post?._embedded?.['wp:featuredmedia']?.[0]
  if (!media?.source_url) return null

  const preferredSize = media.media_details?.sizes?.large || media.media_details?.sizes?.full
  return {
    url: preferredSize?.source_url || media.source_url,
    alt: media.alt_text || post.title?.rendered || '',
    width: preferredSize?.width || media.media_details?.width,
    height: preferredSize?.height || media.media_details?.height,
  }
}

export function getPostExcerpt(post, maxLength = 260) {
  const html = post?.excerpt?.rendered || post?.content?.rendered || ''
  const text = new DOMParser().parseFromString(html, 'text/html').body.textContent
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

export function getWordPressFeedUrl() {
  if (!API_URL) return null
  const apiBase = getBlogApiBaseUrl()
  const feedBase = apiBase.replace(/\/wp-json\/wp\/v2\/?$/, '')
  return `${feedBase}/feed/`
}

const allowedTags = new Set([
  'A', 'ABBR', 'ADDRESS', 'B', 'BLOCKQUOTE', 'BR', 'CAPTION', 'CITE', 'CODE',
  'DD', 'DEL', 'DETAILS', 'DIV', 'DL', 'DT', 'EM', 'FIGCAPTION', 'FIGURE',
  'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HR', 'I', 'IMG', 'INS', 'KBD', 'LI',
  'OL', 'P', 'PRE', 'Q', 'S', 'SMALL', 'SPAN', 'STRONG', 'SUB', 'SUMMARY',
  'SUP', 'TABLE', 'TBODY', 'TD', 'TFOOT', 'TH', 'THEAD', 'TR', 'U', 'UL',
])
const discardTags = new Set(['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'SVG', 'MATH'])
const safeAttributes = new Set([
  'alt', 'colspan', 'height', 'href', 'rowspan', 'src', 'target', 'title', 'width',
])

function isSafeUrl(value, image = false) {
  try {
    const url = new URL(value, window.location.origin)
    if (!['http:', 'https:'].includes(url.protocol)) return false
    return !image || ['http:', 'https:'].includes(url.protocol)
  } catch {
    return false
  }
}

function copySafeNode(node, documentRef) {
  if (node.nodeType === Node.TEXT_NODE) return documentRef.createTextNode(node.textContent)
  if (node.nodeType !== Node.ELEMENT_NODE) return documentRef.createDocumentFragment()

  const tag = node.tagName
  if (discardTags.has(tag)) return documentRef.createDocumentFragment()

  if (!allowedTags.has(tag)) {
    const fragment = documentRef.createDocumentFragment()
    node.childNodes.forEach((child) => fragment.append(copySafeNode(child, documentRef)))
    return fragment
  }

  const safeElement = documentRef.createElement(tag.toLowerCase())
  for (const attribute of node.attributes) {
    const name = attribute.name.toLowerCase()
    if (!safeAttributes.has(name)) continue
    if ((name === 'href' || name === 'src') && !isSafeUrl(attribute.value, name === 'src')) continue
    safeElement.setAttribute(name, attribute.value)
  }

  if (tag === 'A' && safeElement.getAttribute('target') === '_blank') {
    safeElement.setAttribute('rel', 'noopener noreferrer')
  }
  if (tag !== 'IMG') {
    node.childNodes.forEach((child) => safeElement.append(copySafeNode(child, documentRef)))
  }
  return safeElement
}

export function sanitizeWordPressHtml(html) {
  const parsed = new DOMParser().parseFromString(String(html), 'text/html')
  const output = document.createElement('div')
  parsed.body.childNodes.forEach((node) => output.append(copySafeNode(node, document)))
  return output.innerHTML
}
