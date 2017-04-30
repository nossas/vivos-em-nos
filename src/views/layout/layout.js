import { h } from 'preact' /** @jsx h */
import { Layout, Section } from 'preact-layout'
import { Menu, MenuItem } from '../../menu/components'

const Header = () => {}

const LayoutDefault = ({ children }) => {
  return (
    <Layout>
      <Menu>
        <MenuItem href='/'>Início</MenuItem>
        <MenuItem>Criar Homenagem</MenuItem>
        <MenuItem>Editar Homenagem</MenuItem>
        <MenuItem>Quem Somos</MenuItem>
      </Menu>
      <Section type={Header} />
      <Section>{children}</Section>
    </Layout>
  )
}

export {
  Header,
  LayoutDefault
}
