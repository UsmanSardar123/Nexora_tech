export const demoCategories = [
  { id: 1, name: 'Web Development', taxonomy: 'category' },
  { id: 2, name: 'Mobile Apps', taxonomy: 'category' },
  { id: 3, name: 'Cloud Computing', taxonomy: 'category' },
  { id: 4, name: 'Artificial Intelligence', taxonomy: 'category' },
]

function createPost({ id, title, slug, date, categoryId, excerpt, content }) {
  const category = demoCategories.find(({ id: value }) => value === categoryId)

  return {
    id: `demo-${id}`,
    date,
    slug,
    status: 'publish',
    title: { rendered: title },
    excerpt: { rendered: `<p>${excerpt}</p>` },
    content: { rendered: content },
    categories: [categoryId],
    _embedded: { 'wp:term': [[category]] },
  }
}

export const demoPosts = [
  createPost({
    id: 1,
    title: 'A practical guide to planning a modern website',
    slug: 'planning-a-modern-website-demo',
    date: '2026-04-18T09:00:00',
    categoryId: 1,
    excerpt: 'A clear project brief helps teams make better design and technology decisions before development begins.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> A useful website starts with a shared understanding of its audience, purpose, and content.</p><h2>Start with the user journey</h2><p>Map the questions visitors bring to each page. A focused structure makes the site easier to use and easier to maintain.</p><h2>Agree on a foundation</h2><ul><li>Define the essential pages and their goals.</li><li>Choose accessible patterns and a consistent visual system.</li><li>Plan for performance, responsive layouts, and future content.</li></ul><p>Use this sample to preview blog typography and navigation. Replace it with published WordPress content when an endpoint is configured.</p>',
  }),
  createPost({
    id: 2,
    title: 'Designing mobile experiences that feel effortless',
    slug: 'mobile-experiences-demo',
    date: '2026-04-10T09:00:00',
    categoryId: 2,
    excerpt: 'Thoughtful mobile interfaces keep common actions clear and comfortable on smaller screens.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> Mobile products work best when they give attention to the context in which people use them.</p><h2>Reduce friction</h2><p>Keep navigation predictable, use readable type, and make touch targets easy to reach.</p><blockquote><p>Good responsive design adapts the experience, not just the dimensions.</p></blockquote><p>Test real content at multiple widths before considering a screen finished.</p>',
  }),
  createPost({
    id: 3,
    title: 'Making cloud adoption easier to reason about',
    slug: 'cloud-adoption-demo',
    date: '2026-03-28T09:00:00',
    categoryId: 3,
    excerpt: 'A measured cloud plan considers reliability, security, cost, and operational needs together.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> Cloud decisions should follow business requirements instead of trends.</p><h2>Take an incremental view</h2><p>Understand current workloads, identify constraints, and decide how success will be measured.</p><ul><li>Document availability and recovery expectations.</li><li>Review data handling and access requirements.</li><li>Monitor costs as architecture evolves.</li></ul>',
  }),
  createPost({
    id: 4,
    title: 'Where AI features can improve everyday workflows',
    slug: 'ai-workflows-demo',
    date: '2026-03-15T09:00:00',
    categoryId: 4,
    excerpt: 'Useful AI integrations begin with a well-defined task and clear expectations for human review.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> AI can assist with repetitive work when the inputs, boundaries, and expected outcomes are understood.</p><h2>Keep people in control</h2><p>Make it clear when a result is generated, provide ways to review it, and avoid using automation where errors have serious consequences.</p><p>Start with a small workflow, measure its usefulness, and refine it with real feedback.</p>',
  }),
  createPost({
    id: 5,
    title: 'Building accessible interfaces from the start',
    slug: 'accessible-interfaces-demo',
    date: '2026-03-02T09:00:00',
    categoryId: 1,
    excerpt: 'Accessibility is easier to maintain when semantic structure and keyboard support are part of everyday design.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> Accessible interfaces serve more people and are often more resilient.</p><h2>Make the basics dependable</h2><p>Use semantic elements, label controls, preserve visible focus, and verify contrast for text and interactive states.</p><p>Combine automated checks with keyboard and assistive-technology testing.</p>',
  }),
  createPost({
    id: 6,
    title: 'A thoughtful approach to app performance',
    slug: 'app-performance-demo',
    date: '2026-02-20T09:00:00',
    categoryId: 2,
    excerpt: 'Perceived speed comes from prioritizing the content and actions people need first.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> Performance improvements start with measurement.</p><h2>Focus on what matters</h2><p>Track startup time, loading states, and common user journeys. Optimize images and defer work that is not needed immediately.</p><p>Small, evidence-based changes are easier to validate than broad rewrites.</p>',
  }),
  createPost({
    id: 7,
    title: 'Reliable releases through small delivery steps',
    slug: 'reliable-releases-demo',
    date: '2026-02-08T09:00:00',
    categoryId: 3,
    excerpt: 'Smaller releases make changes easier to review, verify, and roll back when needed.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> Reliable delivery is supported by clear ownership and repeatable checks.</p><h2>Make each change observable</h2><p>Keep deployments small, define a way to confirm expected behavior, and ensure the team knows how to respond if something goes wrong.</p>',
  }),
  createPost({
    id: 8,
    title: 'Choosing the right first use case for automation',
    slug: 'automation-use-case-demo',
    date: '2026-01-25T09:00:00',
    categoryId: 4,
    excerpt: 'A well-scoped automation opportunity has repeatable steps, measurable value, and clear oversight.',
    content: '<p><strong>Sample article for the local frontend preview.</strong> Start by understanding the process and its exceptions before selecting a tool.</p><h2>Set a measurable goal</h2><p>Choose an outcome that can be observed, define how people will review exceptions, and revisit the workflow after a trial period.</p>',
  }),
]

export function getDemoPosts({ page = 1, perPage = 7, categoryId, search = '' } = {}) {
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const filteredPosts = demoPosts.filter((post) => {
    const matchesCategory = categoryId == null || post.categories.includes(categoryId)
    const searchableText = [
      post.title.rendered,
      post.excerpt.rendered,
      post.content.rendered,
    ]
      .join(' ')
      .replace(/<[^>]*>/g, ' ')
      .toLocaleLowerCase()

    return matchesCategory && (!normalizedSearch || searchableText.includes(normalizedSearch))
  })
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / perPage))
  const start = (page - 1) * perPage

  return {
    posts: filteredPosts.slice(start, start + perPage),
    totalPages,
  }
}

export function getDemoPost(slug) {
  return demoPosts.find((post) => post.slug === slug) || null
}
