import { h } from 'preact' /** @jsx h */

const MenuTrigger = ({ setActive, className }) => (
  <button
    className={`components--menu-trigger ${className}`}
    onClick={() => setActive(true)}
  >
    <img src="/img/icone-menu.svg" alt="menu" />
  </button>
)

MenuTrigger.defaultProps = {
  className: '',
}

export default MenuTrigger
