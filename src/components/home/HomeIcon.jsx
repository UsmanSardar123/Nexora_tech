function HomeIcon({ name }) {
  const paths = {
    web: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13l-2 2 2 2m4-4 2 2-2 2" />
      </>
    ),
    cloud: (
      <path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z" />
    ),
    mobile: (
      <>
        <rect x="6" y="2.5" width="12" height="19" rx="2" />
        <path d="M10 5h4m-3 13.5h2" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-1a6 6 0 0 1 12 0v1m2-9a3 3 0 1 0-1-5.8M18 14a5 5 0 0 1 3 5v1" />
      </>
    ),
    technology: (
      <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" />
    ),
    security: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    client: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" className="nx-home-icon" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
        {paths[name]}
      </g>
    </svg>
  )
}

export default HomeIcon
