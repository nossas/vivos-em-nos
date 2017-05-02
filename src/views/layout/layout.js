import { h } from 'preact' /** @jsx h */
import { Layout, Section } from 'preact-layout'
import { Menu, MenuItem } from '../../menu/components'
import * as paths from '../../paths'
import MainFooter from './footer'

const Header = function() { return 'Header' }
const Footer = function() { return 'Footer' }

const LayoutDefault = ({ children }) => (
  <Layout>
    <Menu>
      <MenuItem href={paths.home()}>Início</MenuItem>
      <MenuItem href={paths.memoryCreate()}>Criar Homenagem</MenuItem>
      <MenuItem>Editar Homenagem</MenuItem>
      <MenuItem>Quem Somos</MenuItem>
    </Menu>
    <Section type={Header}>Header</Section>
    <Section>{children}</Section>
    <Section type={Footer}><MainFooter /></Section>
  </Layout>
  )

export {
  Footer,
  Header,
  LayoutDefault,
}
