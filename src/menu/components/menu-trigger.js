import { h } from 'preact' /** @jsx h */

export default ({ setActive }) => (
  <button className='components--menu-trigger' onClick={() => setActive(true)}>
    <img src='/img/icone-menu.svg' alt='menu' />
  </button>
)
