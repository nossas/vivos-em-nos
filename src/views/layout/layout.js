import { h } from 'preact' /** @jsx h */
import { Layout, Section } from 'preact-layout'
import { connect } from 'preact-redux'
import { Loader } from '~src/loader/components'
import LoaderSelectors from '~src/loader/redux/selectors'
import { Menu, MenuItem } from '~src/menu/components'
import * as paths from '~src/paths'
import MainFooter from './footer'

const Header = () => 'Header'
const Footer = () => 'Footer'

const mapStateToProps = state => ({
  isLoaderActive: LoaderSelectors(state).isActive(),
})
const LayoutDefault = connect(mapStateToProps)(
  ({ children, isLoaderActive }) => (
    <Layout>
      {!isLoaderActive ? <div /> : <Loader />}
      <Menu>
        <MenuItem href={paths.home()}>Início</MenuItem>
        <MenuItem href={paths.memoryCreate()}>Criar Homenagem</MenuItem>
        <MenuItem href={paths.aboutUs()}>Quem Somos</MenuItem>
        <a class="components--menu-item " target="_blank" href="https://www.facebook.com/sharer.php?u=https://vivosemnos.org">
          Compartilhar
        </a>
        <a class="components--menu-item " target="_blank" href="https://facebook.com/vivosemnos/?ref=homepage">
          Seguir
        </a>
      </Menu>
      <Section type={Header}>Header</Section>
      <Section>{children}</Section>
      <Section type={Footer}><MainFooter /></Section>
    </Layout>
  ),
)

export {
  Footer,
  Header,
  LayoutDefault,
}
