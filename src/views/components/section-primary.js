import { h } from 'preact' /** @jsx h */

const SectionPrimary = ({ children, header, className, id, articleClassName }) => (
  <section
    {...{ id }}
    className={`components--section-primary ${className}`}
  >
    {header}
    <article className={articleClassName}>
      {children}
    </article>
  </section>
)

SectionPrimary.defaultProps = {
  className: '',
  articleClassName: '',
}

export default SectionPrimary
