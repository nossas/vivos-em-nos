import { h } from 'preact' /** @jsx h */
import { Layout, Section } from 'preact-layout'
import { connect } from 'preact-redux'
import { Loader } from '~src/loader/components'
import LoaderSelectors from '~src/loader/redux/selectors'
import * as MenuActions from '~src/menu/redux/action-creators'
import { Menu, MenuItem } from '~src/menu/components'
import { MenuPrimary } from '~src/views/components'
import MainFooter from './footer'

const Header = () => 'Header'
const Footer = () => 'Footer'

const mapStateToProps = state => ({
  isLoaderActive: LoaderSelectors(state).isActive(),
})
const mapDispatchToProps = (dispatch) => {
  dispatch(MenuActions.setActive(false))
  return {}
}
const LayoutDefault = connect(mapStateToProps, mapDispatchToProps)(
  ({ children, isLoaderActive }) => (
    <Layout>
      {!isLoaderActive ? <div /> : <Loader />}
      <MenuPrimary
        ContainerComponent={Menu}
        ChildrensComponent={MenuItem}
        childrensClassName="components--menu-item"
      />
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
