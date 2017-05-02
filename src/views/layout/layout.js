import { h } from 'preact' /** @jsx h */
import { Layout, Section } from 'preact-layout'
import { Menu, MenuItem } from '../../menu/components'
import * as paths from '../../paths'

const Header = () => {}
const Footer = () => {}

const LayoutDefault = ({ children }) => (
  <Layout>
    <Menu>
      <MenuItem href={paths.home()}>Início</MenuItem>
      <MenuItem href={paths.memoryCreate()}>Criar Homenagem</MenuItem>
      <MenuItem>Editar Homenagem</MenuItem>
      <MenuItem>Quem Somos</MenuItem>
    </Menu>
    <Section type={Header} />
    <Section>{children}</Section>
    <Section type={Footer} />
  </Layout>
  )

export {
  Footer,
  Header,
  LayoutDefault,
}
