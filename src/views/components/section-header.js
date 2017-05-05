import { h } from 'preact' /** @jsx h */

export default ({ title, subtitle, children, hideBorder }) => {
  const conditionalClassNames = []
  if (hideBorder) conditionalClassNames.push('hide-border')

  return (
    <header className={`components--section-header ${conditionalClassNames.join(' ')}`}>
      {title && <span className="title">{title}</span>}
      {subtitle && <div className="subtitle">{subtitle}</div>}
      {children}
    </header>
  )
}
