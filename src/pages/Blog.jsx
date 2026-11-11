import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Reveal from '../animations/Reveal.jsx'
import RevealGroup from '../animations/RevealGroup.jsx'
import {
  isWordPressConfigured,
  getPostCategories,
  getPostExcerpt,
  getPostImage,
  getWordPressCategories,
  getWordPressFeedUrl,
  getWordPressPost,
  getWordPressPosts,
  sanitizeWordPressHtml,
} from '../data/blogApi.js'
import { demoCategories, getDemoPost, getDemoPosts } from '../data/blogDemoData.js'
import '../styles/blog.css'

const PAGE_SIZE = 7
const DEMO_MODE = !isWordPressConfigured()

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date)
}

function PostImage({ post, featured = false }) {
  const image = getPostImage(post)

  if (!image) {
    return (
      <div className={`blog-image-placeholder${featured ? ' is-featured' : ''}`} aria-label="No featured image">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <rect x="7" y="9" width="34" height="30" rx="4" />
          <circle cx="18" cy="19" r="3" />
          <path d="m10 34 10-10 7 7 5-5 7 8" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={image.url}
      alt={image.alt}
      loading={featured ? 'eager' : 'lazy'}
      width={image.width || undefined}
      height={image.height || undefined}
    />
  )
}

function ArticleMeta({ post, category, author }) {
  return (
    <div className="article-meta">
      {category && (
        <span>
          <span className="meta-dot" aria-hidden="true" />
          {category}
        </span>
      )}
      <span>{formatDate(post.date)}</span>
      {author && <span>By {author}</span>}
    </div>
  )
}

function FeaturedPost({ post }) {
  const category = getPostCategories(post)[0]?.name

  return (
    <article className="featured-card">
      <Link
        className="featured-image"
        to={`/blog/${encodeURIComponent(post.slug)}`}
        aria-label={`Read ${post.title.rendered}`}
      >
        <PostImage post={post} featured />
      </Link>
      <div className="featured-content">
        <span className="featured-label">Featured Article</span>
        <h2>{post.title.rendered}</h2>
        <p>{getPostExcerpt(post)}</p>
        <ArticleMeta post={post} category={category} />
        <Link className="read-article" to={`/blog/${encodeURIComponent(post.slug)}`}>
          Read Featured Article <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

function PostCard({ post }) {
  const category = getPostCategories(post)[0]?.name
  const postUrl = `/blog/${encodeURIComponent(post.slug)}`

  return (
    <article className="blog-card">
      <Link className="blog-card-image" to={postUrl} aria-label={`Read ${post.title.rendered}`}>
        <PostImage post={post} />
        {category && <span className="blog-card-category">{category}</span>}
      </Link>
      <div className="blog-card-content">
        <Link className="blog-card-title" to={postUrl}>
          <h3>{post.title.rendered}</h3>
        </Link>
        <p>{getPostExcerpt(post)}</p>
        <div className="blog-card-bottom">
          <span className="blog-date">{formatDate(post.date)}</span>
          <Link className="blog-read-more" to={postUrl}>
            Read More <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

function LoadingCards() {
  return (
    <div className="blog-grid" aria-label="Loading articles" aria-busy="true">
      {Array.from({ length: 3 }, (_, index) => (
        <div className="blog-skeleton" key={index}>
          <div className="blog-skeleton-image" />
          <div className="blog-skeleton-copy">
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  )
}

function BlogHero() {
  return (
    <section className="blog-hero">
      <Reveal className="blog-hero-content">
        <span className="blog-eyebrow"><span aria-hidden="true" />The Nexora Blog</span>
        <h1>Insights, Ideas &amp; <span>Tech Updates</span></h1>
        <p>
          Explore the latest trends, practical tips, and expert insights in web
          development, mobile applications, cloud computing, and digital
          innovation. Stay informed and discover ideas that help your business grow.
        </p>
      </Reveal>
    </section>
  )
}

function BlogIndex() {
  const [result, setResult] = useState({
    key: null,
    loading: true,
    posts: [],
    categories: [],
    totalPages: 1,
    error: '',
  })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [page, setPage] = useState(1)
  const [requestId, setRequestId] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const queryKey = `${page}:${selectedCategory ?? 'all'}:${searchQuery}:${requestId}`

  useEffect(() => {
    const controller = new AbortController()
    Promise.all([
      DEMO_MODE
        ? Promise.resolve(getDemoPosts({
            page,
            perPage: PAGE_SIZE,
            categoryId: selectedCategory,
            search: searchQuery,
          }))
        : getWordPressPosts({
            page,
            perPage: PAGE_SIZE,
            categoryId: selectedCategory,
            search: searchQuery,
            signal: controller.signal,
          }),
      DEMO_MODE
        ? Promise.resolve(demoCategories)
        : getWordPressCategories({ signal: controller.signal }),
    ])
      .then(([postResult, categoryResult]) => {
        if (controller.signal.aborted) return
        setResult({
          key: queryKey,
          loading: false,
          posts: postResult.posts,
          categories: categoryResult,
          totalPages: postResult.totalPages,
          error: '',
        })
      })
      .catch((requestError) => {
        if (!controller.signal.aborted && requestError.name !== 'AbortError') {
          setResult({
            key: queryKey,
            loading: false,
            posts: [],
            categories: [],
            totalPages: 1,
            error: requestError.message || 'The articles could not be loaded. Please try again.',
          })
        }
      })

    return () => controller.abort()
  }, [page, selectedCategory, searchQuery, requestId, queryKey])

  const loading = result.key !== queryKey || result.loading
  const { posts, categories, totalPages, error } = result
  const featuredPost = posts[0]
  const latestPosts = useMemo(() => posts.slice(1), [posts])
  const feedUrl = getWordPressFeedUrl()

  function chooseCategory(categoryId) {
    setSelectedCategory(categoryId)
    setPage(1)
  }

  function submitSearch(event) {
    event.preventDefault()
    setSearchQuery(searchValue.trim())
    setPage(1)
  }

  return (
    <main className="nexora-blog-page">
      <BlogHero />

      {DEMO_MODE && (
        <aside className="blog-demo-notice" role="status">
          Showing local sample articles for preview. Set <code>VITE_WORDPRESS_API_URL</code> to
          connect published WordPress content.
        </aside>
      )}

      <section className="blog-categories" aria-label="Filter articles by category">
        <div className="blog-container">
          <div className="category-list">
            <button
              className={`category-button${selectedCategory === null ? ' active' : ''}`}
              type="button"
              aria-pressed={selectedCategory === null}
              onClick={() => chooseCategory(null)}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                className={`category-button${selectedCategory === category.id ? ' active' : ''}`}
                type="button"
                aria-pressed={selectedCategory === category.id}
                key={category.id}
                onClick={() => chooseCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          <form className="blog-search-form" role="search" onSubmit={submitSearch}>
            <label className="visually-hidden" htmlFor="blog-search">Search articles</label>
            <input
              id="blog-search"
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search articles"
            />
            <button className="category-button" type="submit">Search</button>
            {searchQuery && (
              <button
                className="blog-clear-search"
                type="button"
                onClick={() => {
                  setSearchValue('')
                  setSearchQuery('')
                  setPage(1)
                }}
              >
                Clear search
              </button>
            )}
          </form>
        </div>
      </section>

      {error ? (
        <section className="blog-state-section">
          <div className="blog-container">
            <div className="blog-state blog-state-error" role="alert">
              <h2>Articles are temporarily unavailable</h2>
              <p>{error}</p>
              <button className="category-button" type="button" onClick={() => setRequestId((value) => value + 1)}>
                Try again
              </button>
            </div>
          </div>
        </section>
      ) : loading ? (
        <section className="latest-section">
          <div className="blog-container">
            <h2 className="visually-hidden">Loading articles</h2>
            <LoadingCards />
          </div>
        </section>
      ) : posts.length === 0 ? (
        <section className="blog-state-section">
          <div className="blog-container">
            <div className="blog-state">
              <h2>
                {searchQuery
                  ? 'No matching articles'
                  : selectedCategory
                    ? 'No articles in this category yet'
                    : 'New insights are coming soon'}
              </h2>
              <p>
                {searchQuery
                  ? 'Try a different search or clear your search to see all articles.'
                  : selectedCategory
                    ? 'Try another category or return to all articles.'
                    : 'Check back for updates from the Nexora team.'}
              </p>
              {searchQuery && (
                <button
                  className="category-button"
                  type="button"
                  onClick={() => {
                    setSearchValue('')
                    setSearchQuery('')
                    setPage(1)
                  }}
                >
                  Clear Search
                </button>
              )}
              {selectedCategory && (
                <button className="category-button" type="button" onClick={() => chooseCategory(null)}>
                  View All Articles
                </button>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="featured-section" aria-label="Featured article">
            <div className="blog-container">
              <Reveal>
                <FeaturedPost post={featuredPost} />
              </Reveal>
            </div>
          </section>

          <section className="latest-section" id="latest-articles">
            <div className="blog-container">
              <div className="section-header">
                <div>
                  <h2>Latest <span>Articles</span></h2>
                  <p>Practical tips, tutorials, and insights from our team of technology experts.</p>
                </div>
                <a className="view-all" href="#latest-articles">
                  View All Articles <span aria-hidden="true">→</span>
                </a>
              </div>

              {latestPosts.length > 0 ? (
                <RevealGroup className="blog-grid">
                  {latestPosts.map((post) => <PostCard post={post} key={post.id} />)}
                </RevealGroup>
              ) : (
                <p className="blog-no-latest">More articles will appear here as they are published.</p>
              )}

              {totalPages > 1 && (
                <nav className="blog-pagination" aria-label="Article pages">
                  <button
                    className="category-button"
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                  >
                    Previous
                  </button>
                  <span>Page {page} of {totalPages}</span>
                  <button
                    className="category-button"
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  >
                    Next
                  </button>
                </nav>
              )}
            </div>
          </section>
        </>
      )}

      <section className="newsletter-section">
        <div className="blog-container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <span className="newsletter-eyebrow">Stay Connected</span>
              <h2>Get the Latest Tech Insights</h2>
              <p>
                Follow new articles and practical technology ideas from Nexora.
                Our WordPress feed updates when a post is published.
              </p>
            </div>
            <div className="newsletter-action">
              <strong>Follow Nexora articles</strong>
              <p>Subscribe using your preferred feed reader. No email address required.</p>
              {feedUrl ? (
                <a className="feed-link" href={feedUrl} target="_blank" rel="noreferrer">
                  Subscribe via RSS <span aria-hidden="true">→</span>
                </a>
              ) : (
                <span className="feed-link is-disabled">Configure WordPress to view the feed</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function BlogPost({ slug }) {
  const [result, setResult] = useState({ slug: null, post: null, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    const postRequest = DEMO_MODE
      ? Promise.resolve(getDemoPost(slug))
      : getWordPressPost(slug, { signal: controller.signal })

    postRequest.then((post) => {
        if (controller.signal.aborted) return
        setResult({ slug, post, error: '' })
      })
      .catch((requestError) => {
        if (!controller.signal.aborted && requestError.name !== 'AbortError') {
          setResult({
            slug,
            post: null,
            error: requestError.message || 'This article could not be loaded.',
          })
        }
      })

    return () => controller.abort()
  }, [slug])

  const loading = result.slug !== slug
  const { post, error } = result.slug === slug
    ? result
    : { post: null, error: '' }
  const categories = post ? getPostCategories(post) : []
  const image = post ? getPostImage(post) : null
  const safeContent = post ? sanitizeWordPressHtml(post.content?.rendered || '') : ''

  return (
    <main className="nexora-blog-page blog-post-page">
      <section className="blog-post-section">
        <div className="blog-container">
          <Link className="blog-back-link" to="/blog">← Back to all articles</Link>
          {loading ? (
            <div className="blog-state" role="status">Loading article…</div>
          ) : error ? (
            <div className="blog-state blog-state-error" role="alert">
              <h1>Article unavailable</h1>
              <p>{error}</p>
              <Link className="blog-back-link" to="/blog">Return to the blog</Link>
            </div>
          ) : !post ? (
            <div className="blog-state">
              <h1>Article not found</h1>
              <p>This article may have been unpublished or moved.</p>
              <Link className="blog-back-link" to="/blog">Return to the blog</Link>
            </div>
          ) : (
            <article className="blog-article">
              <header className="blog-article-header">
                {categories.length > 0 && (
                  <div className="blog-article-categories">
                    {categories.map((category) => <span key={category.id}>{category.name}</span>)}
                  </div>
                )}
                <h1>{post.title.rendered}</h1>
                <ArticleMeta
                  post={post}
                  author={post._embedded?.author?.[0]?.name}
                />
              </header>
              {image && (
                <img
                  className="blog-article-image"
                  src={image.url}
                  alt={image.alt}
                  width={image.width || undefined}
                  height={image.height || undefined}
                />
              )}
              <div className="blog-article-body" dangerouslySetInnerHTML={{ __html: safeContent }} />
            </article>
          )}
        </div>
      </section>
    </main>
  )
}

function Blog() {
  const { slug } = useParams()
  return slug ? <BlogPost slug={slug} /> : <BlogIndex />
}

export default Blog
