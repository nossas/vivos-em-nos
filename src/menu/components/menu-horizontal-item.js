import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'

export default ({ children, href }) => {
  const dynamicClassNames = []
  if (window.location.pathname === href) dynamicClassNames.push('active')

  return (
    <Link
      className={`menu--horizontal-item ${dynamicClassNames.join(' ')}`}
      href={href}
    >
      {children}
    </Link>
  )
}
