import { connect } from 'preact-redux'
import MenuSelectors from '../redux/selectors'
import * as MenuActions from '../redux/action-creators'
import Menu from './menu'

const mapStateToProps = state => ({
  active: MenuSelectors(state).isActive()
})

const mapDispatchToProps = ({
  setActive: MenuActions.setActive
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
