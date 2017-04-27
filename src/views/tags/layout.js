import { h } from 'preact';
import Header from './header';
import { Menu, MenuItem } from '../../menu/components'

export default function (props) {
  return (
    <div id="app">
      <Header />
      <Menu>
        <MenuItem href='/'>Início</MenuItem>
        <MenuItem>Criar Homenagem</MenuItem>
        <MenuItem>Editar Homenagem</MenuItem>
        <MenuItem>Quem Somos</MenuItem>
      </Menu>
      <main id="content">
        { props.children }
      </main>
    </div>
  );
}
