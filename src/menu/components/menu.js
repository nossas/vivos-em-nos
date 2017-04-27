import { h } from 'preact' /** @jsx h */

import Close from './close'
import Item from './item'

export default ({ active, setActive }) => !active ? null : (
  <div className="components--menu">
    <Close onClick={() => setActive(false)} />
    <Item>Início</Item>
    <Item>Criar Homenagem</Item>
    <Item>Editar Homenagem</Item>
    <Item>Quem Somos</Item>
  </div>
)
