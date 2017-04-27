import { h } from 'preact' /** @jsx h */
import MenuClose from './menu-close'

export default ({ children, active, setActive }) => (
  <nav className={`components--menu ${active ? 'active' : ''}`}>
    <MenuClose onClick={() => setActive(false)} />
    {children}
  </nav>
)
