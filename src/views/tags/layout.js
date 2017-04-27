import { h } from 'preact' /** @jsx h */
import { Menu, MenuItem } from '../../menu/components'
import { Layout, Section } from 'preact-layout'

function Header(){}

function MyLayout({ children }) {
  return (
    <Layout>
      <Menu>
        <MenuItem href='/'>Início</MenuItem>
        <MenuItem>Criar Homenagem</MenuItem>
        <MenuItem>Editar Homenagem</MenuItem>
        <MenuItem>Quem Somos</MenuItem>
      </Menu>
      <Section type={Header}></Section>
      <Section>{children}</Section>
    </Layout>
  )
}

export {
  Header,
  MyLayout
}
