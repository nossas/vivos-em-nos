import { h } from 'preact' /** @jsx h */
import { Layout, Section } from 'preact-layout'
import { FormattedMessage } from 'react-intl'
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
        <MenuItem href={paths.home()}>
          <FormattedMessage
            id="components--menu-item.home"
            defaultMessage="Início"
          />
        </MenuItem>
        <MenuItem href={paths.memoryCreate()}>
          <FormattedMessage
            id="components--menu-item.create-memory"
            defaultMessage="Criar Homenagem"
          />
        </MenuItem>
        <MenuItem href={paths.aboutUs()}>
          <FormattedMessage
            id="components--menu-item.about-us"
            defaultMessage="Quem Somos"
          />
        </MenuItem>
        <a
          className="components--menu-item"
          target="_blank"
          href="https://www.facebook.com/sharer.php?u=https://vivosemnos.org"
        >
          <FormattedMessage
            id="components--menu-item.share"
            defaultMessage="Compartilhar"
          />
        </a>
        <a
          className="components--menu-item"
          target="_blank"
          href="https://www.facebook.com/vivosennos/?fref=ts"
        >
          <FormattedMessage
            id="components--menu-item.follow"
            defaultMessage="Seguir"
          />
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
