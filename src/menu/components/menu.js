import { h } from 'preact' /** @jsx h */
import MenuClose from './menu-close'

export default ({ children, active, setActive, ...props }) => {
  console.log('props', props)
  return !active ? null : (
    <nav className="components--menu">
      <MenuClose onClick={() => setActive(false)} />
      {children}
    </nav>
  )
}
