import { h } from 'preact' /** @jsx h */

export default ({ children, header, className }) => (
  <section className={`components--section-primary ${className}`}>
    {header}
    <article>
      {children}
    </article>
  </section>
)
