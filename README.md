# Nexora Technologies

## Install

```sh
npm install
```

## Run locally

```sh
npm run dev
```

Open the local URL printed by Vite. The app uses React Router for Home,
About, Services, Blog, individual Blog articles, and Contact. `/portfolio`
continues to redirect to `/about`.

The Blog uses the WordPress REST API when `VITE_WORDPRESS_API_URL` is set.
Without that setting, it displays clearly labeled local sample articles so
the frontend listing, search, category filters, pagination, and article view
can be previewed without a backend.

## Animating a new page

Use the shared `Reveal` wrapper for a single element and `RevealGroup` for
staggered cards. `Reveal` accepts `direction` (`"up"`, `"left"`, `"right"`, or
`"none"`), `delay` in seconds, `as` for the element tag, and `className`.
`RevealGroup` accepts `as` and `className`; it wraps and staggers its children.
Both respect the user's reduced-motion preference.
Use `CountUp` for numeric values, and `Pressable` to add the shared tap effect
to buttons. Route-level transitions are applied in `App.jsx`.

Use `AnimatedHeading` for staggered, accessible headings. Wrap a phrase in
`{}` to apply the shared blue gradient; set `lightGradient` for headings on a
dark background and `underline` to draw under the first highlighted phrase.

```jsx
<AnimatedHeading text="Our {Services}" tag="h2" />
<AnimatedHeading
  text="Let's build something {amazing}"
  tag="h2"
  lightGradient
  underline
/>
```

```jsx
<Reveal direction="left" className="page-heading">
  <h1>Our services</h1>
</Reveal>
<RevealGroup className="service-grid">
  {services.map((service) => (
    <article key={service.id}>{service.title}</article>
  ))}
</RevealGroup>
```
