import { h } from 'preact' /** @jsx h */

import Close from './components/close'
import Item from './components/item'

export default props => (
  <div className="components--menu">
    <Close onClick={() => { console.log('qqq') }} />
    <Item>Início</Item>
    <Item>Criar Homenagem</Item>
    <Item>Editar Homenagem</Item>
    <Item>Quem Somos</Item>
  </div>
)
