import { h } from 'preact' /** @jsx h */

export default ({ title, subtitle, children, hideBorder }) => {
  const conditionalClassNames = []
  if (hideBorder) conditionalClassNames.push('hide-border')

  return (
    <header className={`components--section-header ${conditionalClassNames.join(' ')}`}>
      {title}
      <div className="subtitle">{subtitle}</div>
      {children}
    </header>
  )
}
