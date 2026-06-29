import { heroImages } from '../../data/assets'

export function PageHero({ eyebrow, title, text, image = heroImages.technology, children }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url("${image}")` }}>
      <div className="container page-hero-copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  )
}
