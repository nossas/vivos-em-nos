import { h } from 'preact' /** @jsx h */

export default ({ children, header }) => (
  <section className='components--section-primary'>
    {header}
    <article>
      {children}
    </article>
  </section>
)
