import { connect } from 'preact-redux'
import * as MenuActions from '../redux/action-creators'
import MenuTrigger from './menu-trigger'

export default connect(undefined, MenuActions)(MenuTrigger)
