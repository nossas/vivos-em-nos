import { h } from 'preact' /** @jsx h */
import { Link } from 'preact-router'

export default ({ children, href, setActive }) => {
  const dynamicClassNames = []
  if (window.location.pathname === href) dynamicClassNames.push('active')

  return (
    <Link
      className={`components--menu-item ${dynamicClassNames.join(' ')}`}
      href={href}
      onClick={(() => setActive(false))}
    >
      {children}
    </Link>
  )
}
